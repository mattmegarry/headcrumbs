from rest_framework import serializers
from .models import Crumb, Trail

class CrumbSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crumb
        fields = ['id', 'text', 'url']

class TrailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trail
        fields = ['id', 'name', 'slug']
