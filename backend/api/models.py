from django.db import models
from django.contrib.auth.models import User

# Create your models here.

#ORM = technique that allows you to use OOP languages (like python) to interact with  a db instead of
#writing raw SQL.

#ORM in django:
#lets you define models (classes) in python that represent tables in the db
#you define the structure of the table using code and django will generate and do the
# necessary SQL commands

#this is a note model, which is a python class, which represents a table called note
#we pass models.Model so that the class inherits from model.Models and the program knows to treat this
#class like a model (table). By doing this we gain access to CRUD (create, read, update, delete) operations
#We also gain ability to define our column/field types (e.g CharField, DateField) and query, create
#relationships, perform migrations and perform validations.
#overall, makes program treat this class as a model/table allowing you to have things like CRUD ops and
#methods of interacting with the db
class Note(models.Model):
    #defining the columns of the table
    title = models.CharField(max_length=100)
    content = models.TextField()
    createdAt = models.DateTimeField(auto_now_add=True) #auto_now_add=True makes program automatically fill out this field with current dat & time

    #using author as FK to create relationship with User table
    #on-delete=models.CASCADE, if User is deleted, then all notes associated with that user are too
    #related_name='notes', allows User model to access related notes, e.g. possibly use user.notes.all()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')

    #if note object is printed, just print its title
    def __str__(self):
        return self.title