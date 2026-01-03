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
        ]


class SingleServiceMetaTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = SingleServiceMetaTag
        fields = ['id', 'attribute_type', 'meta_name', 'meta_content']


class SigngleServiceMetadataSerializer(serializers.ModelSerializer):
    meta_tags = SingleServiceMetaTagSerializer(many=True, read_only=True)
    
    class Meta:
        model = SingleServiceMetadata
        fields = ['id', 'service', 'page_title', 'meta_tags']


class ServicesPageMetaTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServicesPageMetaTag
        fields = ['id', 'attribute_type', 'meta_name', 'meta_content']


class ServicesPageMetadataSerializer(serializers.ModelSerializer):
    meta_tags = ServicesPageMetaTagSerializer(many=True, read_only=True)
    
    class Meta:
        model = ServicesPageMetadata
        fields = ['id', 'page_title', 'meta_tags']


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