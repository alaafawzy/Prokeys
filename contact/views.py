from django.shortcuts import render
from rest_framework import generics, viewsets

from .models import MetaTag, Metadata
from .serializers import DetailedSerializer, MetaTagSerializer, MetadataSerializer
from django.core.mail import BadHeaderError, send_mail
from rest_framework.response import Response
from prokeys111.settings import EMAIL_HOST_USER


class ContactUs(generics.GenericAPIView):
    serializer_class = DetailedSerializer
    def post(self,request,*args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        name = serializer.validated_data['name']
        company_name = serializer.validated_data['company_name']
        email = serializer.validated_data['email']
        phone = serializer.validated_data['phone']
        details = serializer.validated_data['details']
        message = 'A new customer wants to contact with you \n'+' Name: '+str(name)+'\n Comapny Name: '+str(company_name)+'\n Email: '+str(email)+'\n phone: '+str(phone)+'\n Details: '+str(details)

        if email:
            send_mail('New Contact', message, EMAIL_HOST_USER, [EMAIL_HOST_USER])
            return Response(status=200)
        return Response(status=400)


class MetadataViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for retrieving Contact page metadata."""

    queryset = Metadata.objects.all()
    serializer_class = MetadataSerializer


class MetaTagViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for retrieving individual meta tags for the Contact page."""

    queryset = MetaTag.objects.all()
    serializer_class = MetaTagSerializer
