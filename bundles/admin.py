from django.contrib import admin
from .models import *

# Register your models here.


admin.site.register(Metadata)

class AdvantageInline(admin.TabularInline):
    model = Advantage
    extra = 1

class BundleAdmin(admin.ModelAdmin):
    inlines = [AdvantageInline]

admin.site.register(DescriptionSection)

admin.site.register(Bundle, BundleAdmin)