
from rest_framework import viewsets, generics
from django.http import Http404
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import Service, ServiceSection, ServicesDescriptionSection
from .serializers import *


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class ServiceBySlugView(generics.RetrieveAPIView):
    serializer_class = ServiceSerializer

    def get_object(self):
        slug = self.kwargs.get("slug")
        lang = self.request.query_params.get("lang")

        queryset = Service.objects.all()

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

        raise Http404("Service not found")


class ServiceSectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceSection.objects.all()
    serializer_class = ServiceSectionSerializer


class ServicesPageMetadataViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for retrieving metadata for the services list page.
    """
    queryset = ServicesPageMetadata.objects.all()
	
    serializer_class = ServicesPageMetadataSerializer


class ServicesDescriptionSectionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for retrieving the Services description section.
    Provides list and retrieve endpoints for description content.
    """
    queryset = ServicesDescriptionSection.objects.all()
    serializer_class = ServicesDescriptionSectionSerializer