from rest_framework import generics,permissions
from .models import New
from .serializers import *
from rest_framework import viewsets

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

class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

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






