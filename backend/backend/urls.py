from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
import rest_framework
from todo import views


router =routers.DefaultRouter()
router.register(r'todo', views.TodoView, 'todo')

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/blog', include('blog.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
]
