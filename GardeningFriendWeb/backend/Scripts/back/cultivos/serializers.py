from rest_framework import serializers # type: ignore
from .models import Cultivo

class CultivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cultivo
        fields = '__all__'