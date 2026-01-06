from django.contrib import admin

from .models import Metadata, MetaTag


# class EmailAdmin(admin.ModelAdmin):
# 	list_display = ["email"]


class MetaTagInline(admin.TabularInline):
	model = MetaTag
	extra = 1


# @admin.register(Metadata)
class MetadataAdmin(admin.ModelAdmin):
	list_display = ["id", "page_title"]
	inlines = [MetaTagInline]


admin.site.register(Metadata, MetadataAdmin)
