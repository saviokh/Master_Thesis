from django.urls import path
from .views import UserAPIView,customers,image_view,LoginAPIView,PredictionbyuseridAPIView,AddPredictionsView



urlpatterns = [
   path('AddPrediction/', AddPredictionsView.as_view(), name="AddPredictionsView"),
    path('getpredictionbyuserid/<int:id>', PredictionbyuseridAPIView.as_view()),
    path('getusers/', UserAPIView.as_view(), name="getusers"),
   path('api/predictions/', customers, name='customers'),
   path('image/<str:filename>/', image_view),
   path('login/', LoginAPIView.as_view(), name="login"),
   
   
]