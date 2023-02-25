from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('dashboard/', include('admin_app.urls')),
    path('admin/', admin.site.urls),
    path('django_plotly_dash/', include('django_plotly_dash.urls')),
]
