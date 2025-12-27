
from rest_framework import viewsets
from .models import Service, ServiceSection
from .serializers import ServiceSerializer, ServiceSectionSerializer

class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = Service.objects.all()
	serializer_class = ServiceSerializer

class ServiceSectionViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = ServiceSection.objects.all()
	serializer_class = ServiceSectionSerializer
