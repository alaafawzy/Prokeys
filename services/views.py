
from rest_framework import viewsets
from .models import Service, ServiceSection, ServicesDescriptionSection
from .serializers import *

class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = Service.objects.all()
	serializer_class = ServiceSerializer

class ServiceSectionViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = ServiceSection.objects.all()
	serializer_class = ServiceSectionSerializer

class SingleServiceMetadataViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for retrieving metadata for individual service posts.
    Supports filtering by service ID using ?service=<id> query parameter
    """
    queryset = SingleServiceMetadata.objects.all()
    serializer_class = SigngleServiceMetadataSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        service_id = self.request.query_params.get('service', None)
        if service_id is not None:
            queryset = queryset.filter(service_id=service_id)
        return queryset

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