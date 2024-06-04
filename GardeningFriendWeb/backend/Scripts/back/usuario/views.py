from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password
from .serializer import CustomUserSerializer
from .models import CustomUser

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
        user = CustomUser.objects.create(username=username, email=email, password=hashed_password)
        
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')

        try:
            user = CustomUser.objects.get(username=username)
            if check_password(password, user.password):
                #is_admin = user.is_staff or user.is_superuser
                return Response({
                    "username": user.username,
                    "id":user.id,
                    "email": user.email,
                    "is_admin":user.is_admin,
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    

@api_view(['GET'])
def list_users(request):
    if request.method == 'GET':
        users = CustomUser.objects.all()  # Obtener todos los usuarios
        serializer = CustomUserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

@api_view(['PUT'])
def update_user(request, user_id):
    if request.method == 'PUT':
        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        username = request.data.get('username')
        email = request.data.get('email')
        is_admin = request.data.get('is_admin')

        if username:
            user.username = username
        if email:
            user.email = email
        if is_admin is not None:
            user.is_admin = is_admin

        user.save()
        return Response({'message': f'User {user.username} updated successfully'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['PUT'])
def update_user_role(request, user_id):
    if request.method == 'PUT':
        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        is_admin = request.data.get('is_admin')

        if is_admin is not None:
            user.is_admin = is_admin

        user.save()
        return Response({'message': f'User {user.username} role updated successfully'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['DELETE'])
def delete_user(request, user_id):
    if request.method == 'DELETE':
        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        user.delete()
        return Response({'message': f'User {user_id} deleted successfully'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)