from rest_framework import serializers
from .models import Crumb

class CrumbSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crumb
        fields = ['text', 'url']