from django.contrib import admin
from .models import *

# Register your models here.
class MetaTagInline(admin.TabularInline):
    model = MetaTag
    extra = 1

class MetaTagAdmin(admin.ModelAdmin):
    inlines = [MetaTagInline]

admin.site.register(Metadata, MetaTagAdmin)


admin.site.register(AboutUs)
admin.site.register(AboutSection)