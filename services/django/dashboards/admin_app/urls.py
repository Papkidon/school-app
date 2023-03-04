from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('aggregate/', views.aggregate, name='aggregate'),
]
