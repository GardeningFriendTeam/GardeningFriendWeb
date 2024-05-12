from rest_framework import viewsets # type: ignore
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated # type: ignore

from .serializer import PedidoSerializer
from .serializer import CarritoSerializer
from .serializer import ProductosSerializer
from .serializer import CategoriaSerializer
from .models import Pedido
from .models import Carrito
from .models import Productos
from .models import Categoria
# Create your views here.

class PedidoViewSet(viewsets.ModelViewSet):
    permission_classes=[IsAuthenticated]
    queryset=Pedido.objects.all()
    serializer_class= PedidoSerializer

class CarritoViewSet(viewsets.ModelViewSet):
    permission_classes=[IsAuthenticated]
    queryset=Carrito.objects.all()
    serializer_class= CarritoSerializer

class ProductosViewSet(viewsets.ModelViewSet):
    permission_classes=[IsAuthenticated]
    queryset=Productos.objects.all()
    serializer_class= ProductosSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    permission_classes=[IsAuthenticated]
    queryset=Categoria.objects.all()
    serializer_class= CategoriaSerializer


