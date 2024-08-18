from rest_framework import serializers


class DetailedSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=128,write_only=True)
    email = serializers.EmailField(max_length=128,write_only=True)
    phone = serializers.IntegerField(write_only=True)
    details = serializers.CharField(max_length=255,write_only=True)
    company_name = serializers.CharField(max_length=255,write_only=True)