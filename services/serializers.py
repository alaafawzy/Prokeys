from rest_framework import serializers
from .models import Service, ServiceSection

# ...existing code...

class ServiceSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceSection
        fields = [
            'id',
            'image',
            'english_content',
            'arabic_content',
            'image_position',
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

