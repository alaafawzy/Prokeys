from rest_framework import serializers
from .models import Metadata


class DetailedSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=128, write_only=True)
    email = serializers.EmailField(max_length=128, write_only=True)
    phone = serializers.CharField(write_only=True)
    details = serializers.CharField(max_length=1000, write_only=True)
    company_name = serializers.CharField(max_length=255, write_only=True)


class MetadataSerializer(serializers.ModelSerializer):

    class Meta:
        model = Metadata
        fields = "__all__"
