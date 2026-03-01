from django.http import Http404
from django.shortcuts import render, get_object_or_404
from django.db.models import Q
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
        lang = self.request.query_params.get("lang")

        queryset = Blog.objects.all()

        # First, try matching based on the requested language
        if lang == "en":
            obj = queryset.filter(english_slug=slug).first()
            if obj:
                return obj
        elif lang == "ar":
            obj = queryset.filter(arabic_slug=slug).first()
            if obj:
                return obj

        # Fallback: match by either slug field regardless of lang
        obj = queryset.filter(Q(english_slug=slug) | Q(arabic_slug=slug)).first()
        if obj:
            return obj

        # Final fallback: if slug looks like an ID, try primary key
        if isinstance(slug, str) and slug.isdigit():
            return get_object_or_404(queryset, pk=int(slug))

        raise Http404("Blog not found")


class BlogsPageMetadataViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for retrieving metadata for the blogs list page.
    """
    queryset = BlogsPageMetadata.objects.all()
    serializer_class = BlogsPageMetadataSerializer


