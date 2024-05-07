from rest_framework import serializers
from .models import Usuario
from .models import Cultivo
from .models import Pedido
from .models import Carrito
from .models import Productos
from .models import Categoria
from django.contrib.auth.models import User
class UsuarioSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=Usuario
        fields='__all__'

class CultivoSerializer(serializers.ModelSerializer):

    class Meta:
        model=Cultivo
        fields='__all__'

class PedidoSerializer(serializers.ModelSerializer):
   
    class Meta:
        model=Pedido
        fields='__all__'

class CarritoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=Carrito
        fields='__all__'

class ProductosSerializer(serializers.ModelSerializer):

    class Meta:
        model=Productos
        fields='__all__'

class CategoriaSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=Categoria
        fields='__all__'


