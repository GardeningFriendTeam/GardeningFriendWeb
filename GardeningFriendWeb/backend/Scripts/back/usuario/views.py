# from django.shortcuts import render
# from rest_framework import generics
# from .models import CustomUser
# from .serializer import CustomUserSerializer
# from django.contrib.auth import authenticate, login
# from django.http import JsonResponse
# from django.views import View


# class CreateUserView(generics.CreateAPIView):
#     queryset = CustomUser.objects.all()
#     serializer_class = CustomUserSerializer

# class LoginView(View):
#     def post(self, request, *args, **kwargs):
#         email = request.POST.get('email')
#         password = request.POST.get('password')
#         user = authenticate(request, email=email, password=password)
#         if user is not None:
#             login(request, user)
#             return JsonResponse({'message': 'Inicio de sesión exitoso'})
#         else:
#             return JsonResponse({'error': 'Credenciales inválidas'}, status=400) 

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
# @api_view(['POST'])
# def register_user(request):
#     if request.method == 'POST':
#         serializer = CustomUserSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             refresh = RefreshToken.for_user(user)
#             return Response({
#                 'user': serializer.data,
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token)
#             }, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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


@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        # Obtener datos del cuerpo de la solicitud
        username = request.data.get('username')
        password = request.data.get('password')
        
        try:
            # Buscar al usuario en la base de datos por nombre de usuario o correo electrónico
            user = User.objects.get(username=username)
            
            # Verificar si la contraseña proporcionada coincide con la versión encriptada almacenada en la base de datos
            if check_password(password, user.password):
                return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


# @api_view(['POST'])
# def login(request):
#     if request.method == 'POST':
#         # Obtener datos del cuerpo de la solicitud
#         username = request.data.get('username')
#         password = request.data.get('password')
#         print("Password provided:", make_password(password))
        
#         try:
#             # Buscar al usuario en la base de datos por nombre de usuario o correo electrónico
#             user = CustomUser.objects.get(username=username)
#             print("Password in database:", user.password)
#             # Verificar si la contraseña proporcionada coincide con la versión encriptada almacenada en la base de datos
#             if check_password(password, user.password):
#                 return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
#             else:
#                 return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
#         except CustomUser.DoesNotExist:
#             return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
#     else:
#         return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


# @api_view(['POST'])
# def login_view(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         print(data)
#         email = data.get('email')
#         password = data.get('password')
#         user = authenticate(email=email, password=password)
#         if user is not None:
#             login(request, user)
#             return Response({'message': 'Login successful'}, status=200)
#         else:
#             return Response({'error': 'Invalid credentials'}, status=400)


# @api_view(['POST'])
# def login(request):
#     email = request.data.get("email", None)
#     password = request.data.get("password", None)
#     print(email,password)
#     user = authenticate(email=email, password=password)
#     if user:
#         token = RefreshToken.for_user(user)
#         token['is_admin'] = user.is_staff
#         return Response(data={"access_token": str(token.access_token), "refresh_token": str(token), "is_admin": user.is_staff}, status=status.HTTP_200_OK)
#     return Response(data={"message": "No se encontró ningún usuario"}, status=status.HTTP_404_NOT_FOUND)



# Create your views here.
