from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets,generics,request,status
from .serializer import CategoriaSerializer
from .models import CategoriaCultivo
from rest_framework.decorators import api_view
from rest_framework.response import Response



class CategoriaViewSet(viewsets.ModelViewSet):
    queryset=CategoriaCultivo.objects.all()
    serializer_class=CategoriaSerializer


# elimina
class CategoriaUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset=CategoriaCultivo.objects.all()
    serializer_class=CategoriaSerializer


@csrf_exempt   #trae y crea categorias
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def categoriaList(request, format=None):
    '''
    List all code snippets, or create a new snippet.
    Enumere todos los fragmentos de código o cree uno nuevo.
    '''
    if request.method == 'GET':
        categoria = CategoriaCultivo.objects.all()
        serializer = CategoriaSerializer(categoria, many=True)
       
        return Response(serializer.data)

    elif request.method == 'POST':
        
        serializer = CategoriaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # print('desde create'+serializer)
           
            return Response(serializer.data, status=status.HTTP_201_CREATED)
  
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'PUT':
        serializer = CategoriaSerializer(categoria, data=request.data)
        if serializer.is_valid():
            serializer.save()
            # print('desde create'+serializer)
           
            return Response(serializer.data)
  
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        categoria.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
