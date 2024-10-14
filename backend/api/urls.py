from django.urls import path
from . import views


#We keep this urls.py file separate to the one in backend as this handles notes whilst
# the other handles user authentication
urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),

]