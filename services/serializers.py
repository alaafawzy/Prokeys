from rest_framework import serializers
from .models import *

# ...existing code...

class ServiceSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceSection
        fields = [
            'id',
            'image',
            'english_content',
            'arabic_content',
            # 'image_alt_text',
            'english_alt',
            'arabic_alt',
        ]

class ServiceSerializer(serializers.ModelSerializer):
    sections = ServiceSectionSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = [
            'id',
            'english_title',
            'arabic_title',
            'english_description',
            'arabic_description',
            'sections',
            'english_page_title_for_metadata',
            'arabic_page_title_for_metadata',
            'english_page_description_for_metadata',
            'arabic_page_description_for_metadata',
        ]

class ServicesPageMetadataSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ServicesPageMetadata
        fields = ['id', 'english_page_title_for_metadata', 'arabic_page_title_for_metadata', 'english_page_description_for_metadata', 'arabic_page_description_for_metadata']


class ServicesDescriptionSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServicesDescriptionSection
        fields = [
            'id',
            'english_title',
            'arabic_title',
            'english_description',
            'arabic_description',
            'image',
            # 'image_alt_text',
            'english_alt',
            'arabic_alt',
        ]