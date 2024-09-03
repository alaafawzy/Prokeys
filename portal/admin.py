from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(New)

class AdvantageInline(admin.TabularInline):
    model = Advantage
    extra = 1

class BundleAdmin(admin.ModelAdmin):
    inlines = [AdvantageInline]

admin.site.register(Bundle, BundleAdmin)
# admin.site.register(Advantage)

admin.site.register(Footer)
admin.site.register(FAQ)
admin.site.register(Comment)
admin.site.register(AboutUs)
admin.site.register(HomeStarting)