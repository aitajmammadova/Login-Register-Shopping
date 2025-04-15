from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Product
from .serializers import ProductSerializer

# Create your views here.
@api_view(['GET'])
def get_prd_view(request):
    prds=Product.objects.all()
    serializer=ProductSerializer(prds, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def prd_add_view(request):
    serializer=ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)