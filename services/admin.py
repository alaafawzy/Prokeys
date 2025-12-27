from django.contrib import admin

from services.models import ServiceSection, Service



# Register your models here.
class ServiceSections(admin.TabularInline):
    model = ServiceSection
    extra = 1

class ServiceAdmin(admin.ModelAdmin):
    inlines = [ServiceSections]

admin.site.register(Service, ServiceAdmin)