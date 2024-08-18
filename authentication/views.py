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
from .serializers import CustomAuthTokenSerializer,UserSerializer,RegisterSerializer,LoginSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
# Create your views here.
class UserView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = CustomUser.objects.all()  # Don't actually filter here
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user  # Access the user from the request

    def retrieve(self, request, *args, **kwargs):
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

        return Response({
            "user": {
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "tax_record": user.tax_record,
            },
            "message": "User created successfully",
        }, status=status.HTTP_201_CREATED)