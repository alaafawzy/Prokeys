from django.shortcuts import render
from rest_framework import viewsets, generics, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Metadata, Bundle, Advantage, DescriptionSection
from .serializers import MetadataSerializer, DescriptionSectionSerializer

# Metadata Views
class MetadataViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for retrieving Bundles page metadata.
    Provides list and retrieve endpoints for metadata.
    """
    queryset = Metadata.objects.all()
    serializer_class = MetadataSerializer


class DescriptionSectionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for retrieving the Bundles description section.
    Provides list and retrieve endpoints for description content.
    """
    queryset = DescriptionSection.objects.all()
    serializer_class = DescriptionSectionSerializer


