# from django.shortcuts import render
# from rest_framework import generics
# from .models import CustomUser
# from .serializer import CustomUserSerializer

# class CreateUserView(generics.CreateAPIView):
#     queryset = CustomUser.objects.all()
#     serializer_class = CustomUserSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from .serializer import CustomUserSerializer
# from django.contrib.auth import authenticate, login
from django.contrib.auth import authenticate
from rest_framework_simplejwt.views import TokenObtainPairView
import json
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password

@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        # Obtener datos del cuerpo de la solicitud
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        
        # Encriptar la contraseña
        hashed_password = make_password(password)
        
        #Crear el usuario en la base de datos
        user = User.objects.create(username=username, email=email, password=hashed_password)
        
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

#Aquí estan los cambios para que el usuario sea guardado en la tabla customuser:

    # # Agregar la contraseña encriptada a los datos del usuario
    #     user_data = {
    #         'username': username,
    #         'email': email,
    #         'password': hashed_password,
    #     }
        
    #     # Crear el usuario en la base de datos
    #     user_serializer = CustomUserSerializer(data=user_data)
    #     if user_serializer.is_valid():
    #         user_serializer.save()
    #         return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    #     else:
    #         return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # else:
    #     return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

   
# Create your views here.
