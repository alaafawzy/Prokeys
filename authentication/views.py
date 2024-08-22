from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, RetrieveAPIView,GenericAPIView
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken  # For token authentication
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import generics
from .models import CustomUser
from .serializers import ChangePasswordSerializer, CustomAuthTokenSerializer, PasswordResetConfirmSerializer, PasswordResetRequestSerializer, PasswordResetSerializer, ResetPasswordSerializer,UserSerializer,RegisterSerializer,LoginSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.views import PasswordResetConfirmView, INTERNAL_RESET_SESSION_TOKEN
from django.views.decorators.cache import never_cache
from django.utils.decorators import method_decorator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.core.mail import BadHeaderError, send_mail
from django.db.models import Q
from django.http import HttpResponse, JsonResponse, Http404
from .form import PasswordForm
from django.contrib.auth import views as auth_views
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.template.loader import render_to_string
from django.views import View
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
def send_login_email(context,file_name,subject):
    # Load the HTML template and render it with context


    html_content = render_to_string(file_name, context)


    from_email = settings.EMAIL_HOST_USER
    recipient_list = [context['email']]

    # Send the email
    try:
        send_mail(
            subject=subject,
            message='',  # Leave plain text message empty or provide an alternative plain text version
            from_email=from_email,
            recipient_list=recipient_list,
            html_message=html_content
        )
    except BadHeaderError:
        # Handle the error appropriately
        print("Invalid header found.")

# Create your views here.
class UserView(RetrieveAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = CustomUser.objects.all()  # Don't actually filter here
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user  # Access the user from the request

    def retrieve(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"detail": "User not logged in"}, status=401)
        user = self.get_object()
        serializer = self.get_serializer(user)
        return Response(serializer.data)
class LoginView(APIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        # Log the user in
        login(request, user)

        return Response({'message': 'Login successful', 'user': {'first_name':user.first_name, 'last_name':user.last_name, 'email':user.email}}, status=status.HTTP_200_OK)
        
class LogoutView(APIView):
    def get(self, request):
        logout(request)
        return Response({'message': 'Successfully logged out.'})
    

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({"status":"201",
            "message": "User created successfully",
        }, status=status.HTTP_201_CREATED)
    


class Password_reset_request(generics.GenericAPIView):
    serializer_class = ResetPasswordSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data['email']
        associated_users = CustomUser.objects.filter(Q(email=data))
        # You can use more than one way like this for resetting the password.
        # ...filter(Q(email=data) | Q(username=data))
        # but with this you may need to change the password_reset form as well.
        if associated_users.exists():
            for user in associated_users:
                subject = "111prokeys PASSWORD RESET"
                uid= urlsafe_base64_encode(force_bytes(user.pk))
                token = default_token_generator.make_token(user)
                link = 'https://111prokeys.com/confirm/'+str(uid)+'/'+str(token)+'/'
                context = {
                    'url':link,
                    'email':user.email
                }

                try:
                    send_login_email(context,'reset_password.html',subject)
                    return HttpResponse('Email sent successfully')
                except BadHeaderError:
                    return HttpResponse('Email sent successfully')
        return HttpResponse('Email sent successfully')


class CustomPasswordResetConfirmView(auth_views.PasswordResetConfirmView):
    success_url = None  # Cancel the success_url
    serializer_class = PasswordResetConfirmSerializer
    form_class = PasswordForm

    @csrf_exempt
    def form_valid(self, form):
        user=form.save()
        if not user==self.user:
            return HttpResponse(status=400,reason='passwords not matching')
        del self.request.session[INTERNAL_RESET_SESSION_TOKEN]
        return HttpResponse(status=200)

    # test test test
    @csrf_exempt
    # @method_decorator(sensitive_post_parameters())
    @method_decorator(never_cache)
    def dispatch(self, *args, **kwargs):

        self.validlink = False
        # self.user = self.get_user(kwargs["uidb64"])
        uid = urlsafe_base64_decode(kwargs["uidb64"]).decode()
        self.user = CustomUser.objects.get(pk=uid)
        print(self.user)
        if self.user is not None:
            print(self.user)
            token = kwargs["token"]
            if token == self.reset_url_token:
                session_token = self.request.session.get(INTERNAL_RESET_SESSION_TOKEN)
                print(session_token)
                print(token)
                print(self.reset_url_token)
                if self.token_generator.check_token(self.user, session_token):
                    # If the token is valid, display the password reset form.
                    print("yes ")
                self.validlink = True
                return super().dispatch(*args, **kwargs)
            else:
                print(token)
                if self.token_generator.check_token(self.user, token):
                    print(token)
                    self.request.session[INTERNAL_RESET_SESSION_TOKEN] = token
                    print(token)
                    return HttpResponse(status=200)

            # Display the "Password reset unsuccessful" page.
        return HttpResponse(status=401)

class PasswordResetRequestView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = get_object_or_404(CustomUser, email=email)
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            reset_link = f"http://111prokeys.com/reset-password/{uid}/{token}/"
            
            subject = "111prokeys PASSWORD RESET"
            context = {
                'url':reset_link,
                'email':user.email
            }

            try:
                send_login_email(context,'reset_password.html',subject)
                return HttpResponse('Email sent successfully')
            except BadHeaderError:
                return HttpResponse('Email sent successfully')
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetView(APIView):
    def post(self, request, uidb64, token, *args, **kwargs):
        serializer = PasswordResetSerializer(data=request.data)
        print(serializer.is_valid())
        if serializer.is_valid():
            print("yes")
            try:
                uid = urlsafe_base64_decode(uidb64).decode()
                user = CustomUser.objects.get(pk=uid)
                print(user)
                if default_token_generator.check_token(user, token):
                    user.set_password(serializer.validated_data['password'])
                    user.save()  # Ensure the user is saved after setting the password
                    return Response({'success': True}, status=status.HTTP_200_OK)
                else:
                    return Response({'success': False, 'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
            except (TypeError, ValueError, OverflowError, User.DoesNotExist):
                return Response({'success': False, 'error': 'Invalid user'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChangePasswordView( generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = CustomUser.objects.all()
    serializer_class = ChangePasswordSerializer

    def perform_update(self, serializer):
        super().perform_update(serializer)
    def get_object(self):
        return self.request.user


