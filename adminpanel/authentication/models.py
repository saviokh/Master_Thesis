from distutils import extension
from enum import unique
from django.db import models
# from django_mysql.models import ListTextField
# Create your models here.
from django.contrib.auth.models import (AbstractUser,
    AbstractBaseUser, BaseUserManager, PermissionsMixin)

from django.db import models

class Admin(models.Model):
    Admin_id = models.AutoField(primary_key=True)
    Admin_Username = models.CharField(max_length=255)
    password= models.CharField(max_length=255,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True,null=True,blank=True)
    updated_at = models.DateTimeField(auto_now=True,null=True,blank=True)

class UserManager(BaseUserManager):

    def create_user(self, username, email, password=None):
        if username is None:
            raise TypeError('Users should have a username')
        if email is None:
            raise TypeError('Users should have a Email')
        

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, email, password=None):
        if password is None:
            raise TypeError('Password should not be none')

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


# AUTH_PROVIDERS = {'facebook': 'facebook', 'google': 'google',
#                   'twitter': 'twitter', 'email': 'email'}

STATUS_CHOICES = [
    ('d', 'True'),
    ('p', 'False'),
   
]
class User(AbstractUser):
    username = models.CharField(max_length=255,unique=True, db_index=True)
    password= models.CharField(max_length=255,null=True,blank=True)
    # password_confirmation= models.CharField(max_length=255,null=True,blank=True)
    email = models.EmailField(max_length=255, unique=True,  db_index=True)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)


    Mobile = models.CharField(max_length=255,null=True,blank=True)
  
    is_Admin = models.BooleanField(default=False)
    is_Adminx = models.BooleanField(default=False)
    
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # auth_provider = models.CharField(
    #     max_length=255, blank=False,
    #     null=False, default=AUTH_PROVIDERS.get('email'))

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

class Predictions(models.Model):
    Predictions_id = models.AutoField(primary_key=True,unique=True)
    Predictions_Result = models.CharField(max_length=255)
    Predictions_Percentage = models.CharField(max_length=255)
   
   
    # Users_name = models.TextField(null=True)
    
    username = models.ForeignKey(User,related_name='name',on_delete=models.CASCADE,null=True,blank=True)
    
    # User = models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True,null=True,blank=True)
    updated_at = models.DateTimeField(auto_now=True,null=True,blank=True)
