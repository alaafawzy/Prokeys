from rest_framework import serializers
from .models import MetaTag, Metadata


class DetailedSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=128, write_only=True)
    email = serializers.EmailField(max_length=128, write_only=True)
    phone = serializers.CharField(write_only=True)
    details = serializers.CharField(max_length=1000, write_only=True)
    company_name = serializers.CharField(max_length=255, write_only=True)


class MetaTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetaTag
        fields = '__all__'


class MetadataSerializer(serializers.ModelSerializer):
    meta_tags = MetaTagSerializer(many=True, read_only=True)

    class Meta:
        model = Metadata
        fields = ['id', 'page_title', 'meta_tags']
