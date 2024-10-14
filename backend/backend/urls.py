"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView


#WHAT IS A VIEW
#A VIEW IS A PYTHON FUNCTION THAT TAKES A WEB REQUEST AND RETURNS A WEB RESPONSE
#PROCESSES USER REQUEST, INTERACTS WITH MODEL OR MANIPULATES DATA TO SEND A RESPONSE (COULD BE HTML, JSON...)



#after we've created a new user, can use TokenObtainPairView, TokenRefreshView to obtain token for user`
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
urlpatterns = [


    path('admin/', admin.site.urls),


    #THIS PROCESS IS THE SIMILAR FOR ALL THE PATH(...)S BELOW
    #when client (could be web browser, api etc...) is creating an account, URL likely to contain
    # '..../api/user/register/'. Then, when they are done adding details and submit, they send
    # request to the URL 'api/user/register/'.
    # This triggers the .as_view() method to run on the class based view CreateUserView, creating
    #a view function. This view function will create a new instance of the CreateUserView class and
    #then use the code within that class to handle the data received, i.e. the code will create a
    # new valid user.
    #name='register' means we can refer to the root 'api/user/register/' in our code as register
    #when we go to the root api/user/register/, we call CreateUserView.as_view() to create a new user
    path('api/user/register/', CreateUserView.as_view(), name='register'),

    #this allows us to get the tokens for the user
    path('api/token/', TokenObtainPairView.as_view(), name='getToken'),

    #view to refresh the token
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refreshToken'),

    #if authentication request received (from 'api/auth/') then use default authentication views
    #provided by rest_framework to handle it
    path('api/auth/', include('rest_framework.urls')),

    #if we have a path that starts off with api/ but it's not any of the above
    #take remainder of path and pass it to api.urls as that also stores some paths
    path('api/', include('api.urls')),

    
]

