from django.shortcuts import render
from rest_framework import viewsets, generics
from .models import MetaTag, Metadata, AboutUs, AboutSection
from .serializers import MetaTagSerializer, MetadataSerializer, AboutUsSerializer, AboutSectionSerializer

# Metadata Views
class MetadataViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for retrieving About page metadata.
    Provides list and retrieve endpoints for metadata.
    """
    queryset = Metadata.objects.all()
    serializer_class = MetadataSerializer


class MetaTagViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for retrieving individual meta tags for About pages.
    """
    queryset = MetaTag.objects.all()
    serializer_class = MetaTagSerializer


class MetadataByPageView(generics.ListAPIView):
    """
    Get metadata for a specific page by page identifier.
    Example: /api/about/metadata/?page=about-us
    """
    serializer_class = MetadataSerializer
    
    def get_queryset(self):
        return Metadata.objects.all()


# About Views
class AboutUsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for retrieving About Us information.
    """
    queryset = AboutUs.objects.all()
    serializer_class = AboutUsSerializer


class AboutSectionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for retrieving About Sections with their advantages.
    """
    queryset = AboutSection.objects.all()
    serializer_class = AboutSectionSerializer


