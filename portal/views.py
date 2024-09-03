from rest_framework import generics,permissions
from .models import New
from .serializers import *
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
class NewsView(generics.ListAPIView):
    queryset = New.objects.all()
    serializer_class = NewsSerializer

class FAQViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer

class BundleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Bundle.objects.all()
    serializer_class = BundleSerializer

class FooterViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Footer.objects.all()
    serializer_class = FooterSerializer

class CommentCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    # permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Comment.objects.filter(user=self.request.user)
class AllCommentsListView(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class AboutUsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AboutUs.objects.all()
    serializer_class = AboutUsSerializer

class HomeStartingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HomeStarting.objects.all()
    serializer_class = HomeStartingSerializer
    






