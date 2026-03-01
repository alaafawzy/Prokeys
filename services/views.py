
from rest_framework import viewsets, generics
from django.shortcuts import get_object_or_404
from .models import Service, ServiceSection, ServicesDescriptionSection
from .serializers import *


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class ServiceBySlugView(generics.RetrieveAPIView):
    serializer_class = ServiceSerializer

    def get_object(self):
        slug = self.kwargs.get("slug")
        lang = self.request.query_params.get("lang", "ar")
        if lang == "en":
            return get_object_or_404(Service, english_slug=slug)
        return get_object_or_404(Service, arabic_slug=slug)


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