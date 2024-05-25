from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import FavoritoCultivo, Cultivo
from .serializers import FavoritoCultivoSerializer
# Create your views here.


@api_view(['POST'])
def eliminar_cultivo_favorito(request):
    usuario = request.user
    id_cultivo = request.data.get('id_cultivo')
    if not id_cultivo:
        return Response({'error': 'Se requiere el ID del cultivo'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        cultivo_favorito = FavoritoCultivo.objects.get(usuario=usuario, cultivo_favorito_id=id_cultivo)
    except FavoritoCultivo.DoesNotExist:
        return Response({'error': 'El cultivo no está en favoritos'}, status=status.HTTP_400_BAD_REQUEST)
    
    cultivo_favorito.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)