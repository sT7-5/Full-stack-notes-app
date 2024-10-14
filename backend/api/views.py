from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

# Create your views here.


#api endpoint means a location within the api that accepts requests and sends back responses

#we pass generics.CreateAPIView so that this class inherits from view and program knows
# to treat this class as a view
#Allows the view to create new resources e.g. object in database
#Makes the class/view be treated as a django REST framework API view:
#It will handle incoming requests as an API endpoint and integrate with DRF's
# serialization and validation system, so we can pass JSON data to the view,
# and it will validate, serialize, and create a new instance of a model based on that data.
class CreateUserView(generics.CreateAPIView):
    # list of all objects to look at when creating user so we don't create a duplicate
    queryset = User.objects.all()

    #tells this view what data to accept to create a user i.e. username+password
    serializer_class = UserSerializer

    #allows any user to use this view to create a new user
    permission_classes = [AllowAny]


#generics.ListCreateAPIView is different to generics.CreateAPIView
#ListCreateAPIView allows you to list existing records/objects and create new instances whilst
#CreateAPIView only allows you to create new instances
#this view will list all notes created by user or create a new note
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated] #cannot call this root/api endpoint unless you are authenticated, i.e. you pass valid JWT token

    def get_queryset(self):
        user = self.request.user #getting what user is making the request
        return Note.objects.filter(author=user) #getting all notes created by the user, bascially a SELECT statement

    #serializer refers to the NoteSerializer class as specified in the code above
    def perform_create(self, serializer):
        #serializer checks if data is valid against model's rules
        #so, when view receives data, it creates new instance of a serializer and lets it do validation

        if serializer.is_valid():
            #if serializer passed all checks to create a new note, we create new note using
            #serializer.save#but, we add additional field of author, as in serializer, author is
            # read only so we manually set it here
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user #getting what user is making the request
        return Note.objects.filter(author=user) #getting all notes created by the user, basically a SELECT statement


