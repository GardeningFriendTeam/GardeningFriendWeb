from rest_framework import serializers
from .models import FavoritoCultivo

class FavoritoCultivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoritoCultivo
        fields = '__all__'