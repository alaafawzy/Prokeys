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


class SigngleBlogMetadataViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for retrieving metadata for individual blog posts.
    Supports filtering by blog ID using ?blog=<id> query parameter
    """
    queryset = SigngleBlogMetadata.objects.all()
    serializer_class = SigngleBlogMetadataSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        blog_id = self.request.query_params.get('blog', None)
        if blog_id is not None:
            queryset = queryset.filter(blog_id=blog_id)
        return queryset


class SingleBlogMetaTagViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for retrieving individual meta tags for blog posts.
    """
    queryset = SingleBlogMetaTag.objects.all()
    serializer_class = SingleBlogMetaTagSerializer


class BlogsPageMetadataViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for retrieving metadata for the blogs list page.
    """
    queryset = BlogsPageMetadata.objects.all()
    serializer_class = BlogsPageMetadataSerializer


class BlogsPageMetaTagViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for retrieving meta tags for the blogs list page.
    """
    queryset = BlogsPageMetaTag.objects.all()
    serializer_class = BlogsPageMetaTagSerializer


class BlogMetadataByBlogView(generics.RetrieveAPIView):
    """
    Get metadata for a specific blog post by blog ID.
    Example: /api/blog/metadata/1/
    """
    queryset = SigngleBlogMetadata.objects.all()
    serializer_class = SigngleBlogMetadataSerializer
    lookup_field = 'blog_id'
