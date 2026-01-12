from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import viewsets, generics
# Create your views here.

class BlogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer



class BlogsPageMetadataViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for retrieving metadata for the blogs list page.
    """
    queryset = BlogsPageMetadata.objects.all()
    serializer_class = BlogsPageMetadataSerializer


