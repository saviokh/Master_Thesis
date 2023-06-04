
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, status, views, permissions
from rest_framework.response import Response
from .serializers import UserSerializer,PredictionSerializer,LoginSerializer,AddPredictionSerializer

from tensorflow.keras.models import Model
import tensorflow as tf
import numpy as np
import os
import cv2

# import cv2

from rest_framework.permissions import AllowAny

from io import BytesIO
import base64

from urllib.parse import urlparse, unquote
from PIL import Image
import imutils

from .models import User,Predictions
from rest_framework import filters
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse

from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
class UserAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
# class UserAPIView(generics.GenericAPIView):

class PredictionAPIView(generics.GenericAPIView):


 
    def get(self, request):
        predictions = predictions.objects.all()
        predictions_serializer = PredictionSerializer(notification,many=True)
        return Response(predictions_serializer.data,status=status.HTTP_200_OK)

# class PredictionbyuseridAPIView(generics.GenericAPIView):
    

#      def get(self, request,id):
#         Predictions = predictions.objects.filter(username=id)
#         User_serializer = PredictionSerializer(user,many=True)
#         return Response(User_serializer.data,status=status.HTTP_200_OK)
class PredictionbyuseridAPIView(generics.GenericAPIView):
    
    def get_queryset(self):
        return Predictions.objects.none()  # return an empty queryset

    def get(self, request, id):
        print((id))
        predictions = Predictions.objects.filter(username=id)
        User_serializer = PredictionSerializer(predictions, many=True)
        return Response(User_serializer.data, status=status.HTTP_200_OK)
  


class LoginAPIView(generics.GenericAPIView):
    
    serializer_class = LoginSerializer
    queryset = User.objects.none()
    permission_classes = [permissions.AllowAny]  # added this line

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# class AddPredictionsView(generics.GenericAPIView):
#     serializer_class = AddPredictionSerializer
#     def post(self, request):
     
#         user = request.data
#         serializer = self.serializer_class(data=user)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         user_data = serializer.data

    
#         return Response(user_data, status=status.HTTP_201_CREATED) 



class AddPredictionsView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = AddPredictionSerializer

    def get_queryset(self):
        return Predictions.objects.none()  # return an empty queryset

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        return Response(user_data, status=status.HTTP_201_CREATED)




@csrf_exempt
def customers(request):
    if request.method == 'POST':
       file = request.FILES['file']
       filename = file.name
       image_save_path = 'media/images/' 
       if not os.path.exists('media/images'):
            os.makedirs('media/images')

       with open('media/images/' + filename, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)
       DIR = os.path.join(os.getcwd(), "Dataset")
       train_dataset = tf.keras.preprocessing.image_dataset_from_directory(DIR, validation_split=0.1, subset="training", seed=42, batch_size=32, smart_resize=True, image_size=(256, 256))
       test_dataset = tf.keras.preprocessing.image_dataset_from_directory(DIR, validation_split=0.1, subset="validation", seed=42, batch_size=32, smart_resize=True, image_size=(256, 256))

       classes = train_dataset.class_names
       numClasses = len(train_dataset.class_names)
            # Parse the file URL and unquote the file path
    #    file_path = urlparse(file).path
    #    file_path = unquote(file_path)

    #         # Load the image file using PIL
    #    image = Image.open(file_path)
      
       image = tf.keras.preprocessing.image.load_img(image_save_path + filename, target_size=(256, 256))
       orig = cv2.imread(image_save_path + filename)
       resized = cv2.resize(orig, (256, 256))
       #image = tf.keras.preprocessing.image.load_img("D://machinelearningthesis//adminpanel//Dataset/"+str(file), target_size=(256, 256))
       image = tf.keras.preprocessing.image.img_to_array(image)
       image = np.expand_dims(image, axis=0)
       
    #    file = request.FILES['file']
    #    image = Image.open(BytesIO(file.read()))
    # #    temp_image = Image.open(BytesIO(file.read()))
    # #    temp_image = temp_image.resize((256, 256))
    #    image = image.resize((256, 256))
    #    image_array = np.array(image)
    #    image_array = np.expand_dims(image_array, axis=0)
    #    image_array = image_array / 255.0  # Normalize pixel values

        # Convert Image to base64 encoded string
    


       model_path = os.path.join(os.getcwd(), "Master_thesis_modal.h5")
       model = tf.keras.models.load_model(model_path)
       print(image)
       prediction = model.predict(image)
    #    cam = GradCAM(model, np.argmax(prediction[0]), "expanded_conv_6/expand")
    #    heatmap = cv2.resize(cam.compute_heatmap(image), (orig.shape[1], orig.shape[0]))
    #    (heatmap, output) = cam.overlay_heatmap(heatmap, orig, alpha=0.5)
    #    cv2.putText(output, classes[np.argmax(prediction)], (10, 25), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
    #    output = np.vstack([orig, heatmap, output])
    #    output = imutils.resize(output, height=700)
    #    print('saviop')
    #    print(output)
    #    cv2.imshow('Image', output)
       response = {'classes': classes[np.argmax(prediction)] , 'predictions': prediction[0][np.argmax(prediction)]*100}
       return JsonResponse(response, safe=False)
# def customers(request):
#     model = tf.keras.models.load_model("../Master_thesis_modal.h5")
#     path = "../Dataset/Tuberculosis/Tuberculosis-1.png"
#     image = tf.keras.preprocessing.image.load_img(path, target_size=(256, 256))
#     image = tf.keras.preprocessing.image.img_to_array(image)
#     image = np.expand_dims(image, axis=0)

#     predictions = model.predict(image)
#     customers = [{'id': 1, 'name': 'John Doe'}, {'id': 2, 'name': 'Jane Smith'},path,predictions]
#     return JsonResponse(customers, safe=False)

    #  def get(self, request,id):
    #     user = User.objects.filter(id=id)
    #     User_serializer = UserSerializer(user,many=True)
    #     return Response(User_serializer.data,status=status.HTTP_200_OK)    

#     def get(self, request):
#         user = User.objects.all()
#         user_serializer = UserSerializer(user,many=True)
#         return Response(UserSerializer.data,status=status.HTTP_200_OK)
class GradCAM:
    def __init__(self, model, classIdx, layerName=None):
        self.model = model
        self.classIdx = classIdx
        self.layerName = layerName
        if self.layerName is None:
            self.layerName = self.find_target_layer()

    def find_target_layer(self):
        for layer in reversed(self.model.layers):
            if len(layer.output_shape) == 4:
                return layer.name
        raise ValueError("Could not find 4D layer. Cannot apply GradCAM.")

    def compute_heatmap(self, image, eps=1e-8):
        gradModel = Model(
            inputs=[self.model.inputs],
            outputs=[self.model.get_layer(self.layerName).output,
                     self.model.output])
        with tf.GradientTape() as tape:
            inputs = tf.cast(image, tf.float32)
            (convOutputs, predictions) = gradModel(inputs)
            loss = predictions[:, self.classIdx]
        grads = tape.gradient(loss, convOutputs)
        castConvOutputs = tf.cast(convOutputs > 0, "float32")
        castGrads = tf.cast(grads > 0, "float32")
        guidedGrads = castConvOutputs * castGrads * grads
        convOutputs = convOutputs[0]
        guidedGrads = guidedGrads[0]
        weights = tf.reduce_mean(guidedGrads, axis=(0, 1))
        cam = tf.reduce_sum(tf.multiply(weights, convOutputs), axis=-1)
        (w, h) = (image.shape[2], image.shape[1])
        heatmap = cv2.resize(cam.numpy(), (w, h))
        numer = heatmap - np.min(heatmap)
        denom = (heatmap.max() - heatmap.min()) + eps
        heatmap = numer / denom
        heatmap = (heatmap * 255).astype("uint8")
        return heatmap

    def overlay_heatmap(self, heatmap, image, alpha=0.5, colormap=cv2.COLORMAP_VIRIDIS):
        heatmap = cv2.applyColorMap(heatmap, colormap)
        output = cv2.addWeighted(image, alpha, heatmap, 1 - alpha, 0)
        return (heatmap, output)
def image_view(request, filename):
    # Do something with the filename
    image = Image.open(filename)
    
    # Encode the image as a base64 string
    buffer = BytesIO()
    image.save(buffer, format='PNG')
    image_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
    
    # Construct the response
    response = {
        'filename': filename,
        'image_data': image_base64
    }
    
    return JsonResponse(response)