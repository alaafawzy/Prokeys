from django.contrib import admin
from .models import Blog, BlogsPageMetadata


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ("english_title", "arabic_title", "english_slug", "arabic_slug")
    search_fields = ("english_title", "arabic_title", "english_slug", "arabic_slug")


@admin.register(BlogsPageMetadata)
class BlogsPageMetadataAdmin(admin.ModelAdmin):
    list_display = ("english_page_title_for_metadata",)
    search_fields = ("english_page_title_for_metadata",)