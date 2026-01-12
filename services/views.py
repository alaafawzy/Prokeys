
from rest_framework import viewsets
from .models import Service, ServiceSection, ServicesDescriptionSection
from .serializers import *

class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = Service.objects.all()
	serializer_class = ServiceSerializer

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