from .serializers import AuthTokenSerializer, UserSerializer
from django.shortcuts import render
from rest_framework import generics
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer

class LoginView(ObtainAuthToken):
    serializer_class = AuthTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        is_admin = user.is_staff

        data = {
            "token": token.key,
            "nombre": user.username,
            "user_id": user.id,
            "email": user.email,
            "is_admin": is_admin,
        }

        return Response({"data": data}, status=status.HTTP_200_OK)

    def handle_exception(self, exc):
        # Si ocurre una excepción, devuelve una respuesta con el código de estado 401
        return Response({"error": str(exc)}, status=status.HTTP_401_UNAUTHORIZED)
        





