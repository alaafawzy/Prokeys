from django.shortcuts import render, get_object_or_404
from .models import *
from .serializers import *
from rest_framework import viewsets, generics


class BlogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer


class BlogBySlugView(generics.RetrieveAPIView):
    serializer_class = BlogSerializer

    def get_object(self):
        slug = self.kwargs.get("slug")
        lang = self.request.query_params.get("lang", "ar")
        if lang == "en":
            return get_object_or_404(Blog, english_slug=slug)
        return get_object_or_404(Blog, arabic_slug=slug)


class BlogsPageMetadataViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for retrieving metadata for the blogs list page.
    """
    queryset = BlogsPageMetadata.objects.all()
    serializer_class = BlogsPageMetadataSerializer


