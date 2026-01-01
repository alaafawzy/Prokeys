from django.contrib import admin

from blog.models import BlogsPageMetadata
from services.models import *



# Register your models here.
class ServiceSections(admin.TabularInline):
    model = ServiceSection
    extra = 1

class ServiceAdmin(admin.ModelAdmin):
    inlines = [ServiceSections]

admin.site.register(Service, ServiceAdmin)



class SingleServiceMetaTagInline(admin.TabularInline):
    model = SingleServiceMetaTag
    extra = 1   
class SingleServiceMetaTagAdmin(admin.ModelAdmin):
    inlines = [SingleServiceMetaTagInline]
admin.site.register(SingleServiceMetadata, SingleServiceMetaTagAdmin)

class ServicesPageMetaTagInline(admin.TabularInline):
    model = ServicesPageMetaTag
    extra = 1

admin.site.register(ServicesDescriptionSection)

class ServicesPageMetaTagAdmin(admin.ModelAdmin):
    inlines = [ServicesPageMetaTagInline]
admin.site.register(ServicesPageMetadata, ServicesPageMetaTagAdmin)