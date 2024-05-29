from .models import Cultivo
from rest_framework import serializers
from drf_writable_nested import WritableNestedModelSerializer
from categoriaCultivo.serializer import CategoriaSerializer


class CultivoSerializer(WritableNestedModelSerializer, serializers.HyperlinkedModelSerializer):
    categoria = CategoriaSerializer()

    class Meta:
        model = Cultivo
        fields = ['id','nombre','categoria','descripcion','imagen','region','estacion','temperatura','favorito']