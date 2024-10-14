from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note


#serializer will convert complex python objects like django model instances
# into python data types that can easily be converted into JSON

#serializer will also check if the data passed to it, is valid against the rules of the specified model
#e.g. in NoteSerializer, will check if title is not >100 characters using rules from Note model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"] #these are the fields we want to serialize when we want to accept and return a user

        #code below - allows program to accept password but not to return password when giving info about user
        extra_kwargs = {"password": {"write_only": True}}

    #called when we want to create a new version of the user
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data) #the ** splits up the keywords
        return user

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "createdAt", "author"]
        #can be allowed to read who the author is, but can't write/change it, it will manually be set
        extra_kwargs = {"author": {"read_only": True}}

