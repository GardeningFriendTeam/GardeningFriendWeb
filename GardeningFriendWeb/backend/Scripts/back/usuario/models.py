# from django.db import models
# from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# class CustomUserManager(BaseUserManager):
#     def create_user(self, email, nombre, password=None, **extra_fields):
#         if not email:
#             raise ValueError('El email es obligatorio')
#         email = self.normalize_email(email)
#         user = self.model(email=email, nombre=nombre, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

# class CustomUser(AbstractBaseUser):
#     email = models.EmailField(unique=True)
#     nombre = models.CharField(max_length=30)
#     is_admin = models.BooleanField(default=False)
    
#     objects = CustomUserManager()
    
#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['nombre']

#     def __str__(self):
#         return self.email

# from django.db import models
# from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# class CustomUserManager(BaseUserManager):
#     # def create_user(self, username, email, password=None, is_admin=False):
#     def create_user(self, email, password=None, is_admin=False):
#         if not email:
#             raise ValueError('Users must have an email address')

#         user = self.model(
#             # username=username,
#             email=self.normalize_email(email),
#             is_admin=is_admin
#         )

#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     # def create_superuser(self, username, email, password):
#     def create_superuser(self, email, password):
#         user = self.create_user(
#             # username=username,
#             email=email,
#             password=password,
#             is_admin=True
#         )
#         return user

# # class CustomUser(AbstractBaseUser):
# #     username = models.CharField(max_length=100)
# #     email = models.EmailField(unique=True)
# #     is_active = models.BooleanField(default=True)
# #     is_admin = models.BooleanField(default=False)

# #     objects = CustomUserManager()

    
# #     REQUIRED_FIELDS = ['username']
# #     USERNAME_FIELD = 'email'
    
# #     def __str__(self):
# #         return self.email

# class User(AbstractBaseUser):
#     username = models.CharField(max_length=100)
#     email = models.EmailField(unique=True)
#     is_active = models.BooleanField(default=True)
#     is_admin = models.BooleanField(default=False)

#     objects = CustomUserManager()

    
#     REQUIRED_FIELDS = ['username']
#     USERNAME_FIELD = 'email'
    
#     def __str__(self):
#         return self.email




from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, is_admin=False):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have a username')

        user = self.model(
            username=username,
            email=self.normalize_email(email),
            is_admin=is_admin
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None):
        user = self.create_user(
            username=username,
            email=email,
            password=password,
            is_admin=True
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    # is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return self.is_admin