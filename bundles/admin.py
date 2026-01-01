from django.contrib import admin
from .models import *

# Register your models here.
class MetaTagInline(admin.TabularInline):
    model = MetaTag
    extra = 1

class MetaTagAdmin(admin.ModelAdmin):
    inlines = [MetaTagInline]

admin.site.register(Metadata, MetaTagAdmin)

class AdvantageInline(admin.TabularInline):
    model = Advantage
    extra = 1

class BundleAdmin(admin.ModelAdmin):
    inlines = [AdvantageInline]

admin.site.register(DescriptionSection)

admin.site.register(Bundle, BundleAdmin)