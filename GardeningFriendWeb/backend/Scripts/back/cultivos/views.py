from django.shortcuts import render
from .models import Cultivo
from .serializers import CultivoSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets,generics,request,status # type: ignore
from rest_framework.permissions import AllowAny # type: ignore
from rest_framework.decorators import api_view

# Create your views here.

class CultivoViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = CultivoSerializer
    queryset = Cultivo.objects.all()

# elimina
class CultivoUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset=Cultivo.objects.all()
    serializer_class=CultivoSerializer


@csrf_exempt   #trae y crea cultivos
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def cultivoList(request, format=None):
    '''
    List all code snippets, or create a new snippet.
    Enumere todos los fragmentos de código o cree uno nuevo.
    '''
    if request.method == 'GET':
        cultivo = Cultivo.objects.all()
        serializer = CultivoSerializer(cultivo, many=True)
       
        return Response(serializer.data)

    elif request.method == 'POST':
        
        serializer = CultivoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # print('desde create'+serializer)
           
            return Response(serializer.data, status=status.HTTP_201_CREATED)
  
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'PUT':
        serializer = CultivoSerializer(cultivo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            # print('desde create'+serializer)
           
            return Response(serializer.data)
  
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        cultivo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)