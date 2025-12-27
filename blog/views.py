from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import viewsets, generics
# Create your views here.
# class ListBlogsView(generics.ListAPIView):
#     queryset = Blog.objects.all()
#     serializer_class = BlogSerializer

class BlogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer