from django.http import Http404
from django.shortcuts import render, get_object_or_404
from django.db.models import Q
from rest_framework import viewsets, generics
from rest_framework.pagination import PageNumberPagination

from .models import *
from .serializers import *

# 1. Create your pagination class
class BlogPagination(PageNumberPagination):
    page_size = 10  # Number of blogs per page
    page_size_query_param = 'page_size'  # Optional: allows client ?page_size=20
    max_page_size = 100

class BlogViewSet(viewsets.ReadOnlyModelViewSet):
    # Added ordering to prevent DRF pagination warnings
    queryset = Blog.objects.all().order_by('-id') 
    serializer_class = BlogSerializer
    pagination_class = BlogPagination  # <--- ONLY attached here

class BlogBySlugView(generics.RetrieveAPIView):
    serializer_class = BlogSerializer

    def get_object(self):
        slug = self.kwargs.get("slug")
        lang = self.request.query_params.get("lang")

        queryset = Blog.objects.all()

        if lang == "en":
            obj = queryset.filter(english_slug=slug).first()
            if obj:
                return obj
        elif lang == "ar":
            obj = queryset.filter(arabic_slug=slug).first()
            if obj:
                return obj

        obj = queryset.filter(Q(english_slug=slug) | Q(arabic_slug=slug)).first()
        if obj:
            return obj

        if isinstance(slug, str) and slug.isdigit():
            return get_object_or_404(queryset, pk=int(slug))

        raise Http404("Blog not found")


class BlogsPageMetadataViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for retrieving metadata for the blogs list page.
    This will remain UNPAGINATED because no pagination_class is set.
    """
    queryset = BlogsPageMetadata.objects.all()
    serializer_class = BlogsPageMetadataSerializer