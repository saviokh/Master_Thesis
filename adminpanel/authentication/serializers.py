import email
from pickle import TRUE
from rest_framework import serializers
from .models import  User,Predictions
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.parsers import JSONParser
from rest_framework.decorators import parser_classes
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User 
        fields=('username','email','Mobile',)



class PredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model=Predictions 
        fields = '__all__'        


class AddPredictionSerializer(serializers.ModelSerializer):
    Predictions_Result = serializers.CharField(
        max_length=680, min_length=3,)
    Predictions_Percentage = serializers.CharField(
        max_length=680, min_length=3,)
        

 

    class Meta:
        model = Predictions
        fields = '__all__'


    def validate(self, attrs):
        Predictions_Result = attrs.get('Predictions_Result', '')
        Predictions_Percentage = attrs.get('Predictions_Percentage', '')
        

       
        return attrs

    def create(self, validated_data):
        return Predictions.objects.create(**validated_data)




class LoginSerializer(serializers.ModelSerializer):
    #email = serializers.EmailField(max_length=255, min_length=3)
    password = serializers.CharField(
        max_length=68, min_length=6, write_only=True)
    username = serializers.CharField(
        max_length=255, min_length=3)

    # tokens = serializers.CharField(
    #     max_length=68, min_length=6, read_only=True)

    # def get_tokens(self, obj):
    #     user = User.objects.get(email=obj['email'])

    #     return {
    #         'refresh': user.tokens()['refresh'],
    #         'access': user.tokens()['access']
    #     }
   
    class Meta:
        model = User
        fields = [ 'id','email','password', 'username']
    
    def validate(self, attrs):
        username = attrs.get('username', '')
        #email = attrs.get('email', '')
        password = attrs.get('password', '')


        # filtered_user_by_email = User.objects.filter(email=email)


     
        try:
            
            user = auth.authenticate(username=User.objects.get(email=username), password=password)
        except:
            user = auth.authenticate(username=username, password=password)
        
        if not user:
            raise AuthenticationFailed('Invalid credentials, try again later')
        if not user.is_active:
            raise AuthenticationFailed('Account disabled, contact admin')
        if not user.is_verified:
            raise AuthenticationFailed('Email is not verified')
        raise AuthenticationFailed({
            'status':True,
           
            'email': user.email,
            'id':user.id,
            'is_Admin':user.is_Admin,
            'is_active':user.is_active,
            'is_verified':user.is_verified,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'Mobile': user.Mobile,
          
            
            

        })
        return {
            
            'email': user.email,
            'id':user.id,
            'is_active':user.is_active,
            'is_verified':user.is_verified,
            'username': user.username,
          

        }

        return super().validate(attrs)


