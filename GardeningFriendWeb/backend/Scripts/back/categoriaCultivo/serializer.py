from rest_framework import serializers
from .models import CategoriaCultivo

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model=CategoriaCultivo
        fields='__all__'