from django.shortcuts import render
from rest_framework import viewsets, generics
from .models import Metadata, AboutUs, AboutSection
from .serializers import  MetadataSerializer, AboutUsSerializer, AboutSectionSerializer

# Metadata Views
class MetadataViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for retrieving About page metadata.
    Provides list and retrieve endpoints for metadata.
    """
    queryset = Metadata.objects.all()
    serializer_class = MetadataSerializer


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


