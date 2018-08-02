from main.serializers import TodoItemSerializer
from rest_framework import generics
from main.models import TodoItem

class TodoItemList(generics.ListCreateAPIView):
    """
    List all items or create a new item
    """
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer

class TodoItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer
