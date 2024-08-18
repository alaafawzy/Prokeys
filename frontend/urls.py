from django.urls import path, re_path

from .views import  render_react

urlpatterns = [
    re_path(r'^(?!media).*$', render_react),
]