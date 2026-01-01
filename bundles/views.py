from django.shortcuts import render
from rest_framework import viewsets, generics, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import MetaTag, Metadata, Bundle, Advantage, DescriptionSection
from .serializers import MetaTagSerializer, MetadataSerializer, DescriptionSectionSerializer

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


# class MetaTagViewSet(viewsets.ReadOnlyModelViewSet):
#     """
#     ViewSet for retrieving individual meta tags for Bundles pages.
#     """
#     queryset = MetaTag.objects.all()
#     serializer_class = MetaTagSerializer


# class MetadataByPageView(generics.ListAPIView):
#     """
#     Get metadata for a specific page by page identifier.
#     Example: /api/bundles/metadata/?page=bundles-main
#     """
#     serializer_class = MetadataSerializer
    
#     def get_queryset(self):
#         return Metadata.objects.all()


