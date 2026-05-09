"""
URL configuration for prokeys111 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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
from django.urls import path
from django.urls import path,include,re_path
from django.conf.urls.static import static
from django.conf import settings
from django.http import HttpResponse
import os

def serve_sitemap(request):
    sitemap_path = os.path.join(settings.BASE_DIR, 'sitemap.xml')
    try:
        with open(sitemap_path, 'r', encoding='utf-8') as f:
            content = f.read()
        return HttpResponse(content, content_type='application/xml; charset=utf-8')
    except FileNotFoundError:
        return HttpResponse('Sitemap not found. Run: python manage.py generate_sitemap', status=404)

def serve_robots(request):
    robots_path = os.path.join(settings.BASE_DIR, 'robots.txt')
    try:
        with open(robots_path, 'r', encoding='utf-8') as f:
            content = f.read()
        return HttpResponse(content, content_type='text/plain; charset=utf-8')
    except FileNotFoundError:
        return HttpResponse('robots.txt not found. Run: python manage.py generate_sitemap', status=404)

urlpatterns = [
    path('sitemap.xml', serve_sitemap, name='sitemap'),
    path('robots.txt', serve_robots, name='robots'),
    path('admin/', admin.site.urls),
    path('api/', include('authentication.urls')),
    path('api/contactus/', include('contact.urls')),
    path('api/', include('portal.urls')),
    path('api/blog/', include('blog.urls')),
    path('api/services/', include('services.urls')),
    path('api/about/', include('about.urls')),
    path('api/bundle/', include('bundles.urls')),
    # re_path('',include('frontend.urls'))
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
