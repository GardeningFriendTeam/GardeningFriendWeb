from rest_framework import generics, status
from .models import CustomUser
from .serializer import CustomUserSerializer
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from rest_framework.views import APIView


class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
# Create your views here.


class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        user = authenticate(email=request.data.get('email'), password=request.data.get('password'))
        if user is not None:
            login(request, user)  # Opcional: Iniciar sesión al usuario en la sesión de solicitud
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        else:
            return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)
