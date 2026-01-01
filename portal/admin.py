from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(New)


# admin.site.register(Advantage)

admin.site.register(Footer)
admin.site.register(FAQ)
admin.site.register(Comment)

admin.site.register(HomeStarting)
admin.site.register(SystemPartner)

class MetaTagInline(admin.TabularInline):
    model = MetaTag
    extra = 1

class MetaTagAdmin(admin.ModelAdmin):
    inlines = [MetaTagInline]

admin.site.register(Metadata, MetaTagAdmin)