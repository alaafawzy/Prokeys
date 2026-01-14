from django.contrib import admin
from django.utils.html import format_html

from services.models import Service, ServiceSection, ServicesPageMetadata, ServicesDescriptionSection


class ServiceSectionInline(admin.StackedInline):
    model = ServiceSection
    extra = 1
    readonly_fields = ("image_preview",)
    fieldsets = (
        ("Image", {"fields": ("image_preview", "image"), "classes": ("wide",)}),
        ("Alt text", {"fields": ("english_alt", "arabic_alt"), "classes": ("wide",)}),
        (
            "Content",
            {
                "fields": ("english_content", "arabic_content"),
                "classes": ("collapse", "wide"),
            },
        ),
    )

    class Media:
        css = {
            "all": ("services/admin_service_sections.css",),
        }

    def image_preview(self, obj):
        if obj and obj.image:
            return format_html('<img src="{}" style="max-height: 80px; max-width: 120px; border-radius: 4px;" />', obj.image.url)
        return "No image"

    image_preview.short_description = "Current image"


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("english_title", "arabic_title", "section_count")
    search_fields = ("english_title", "arabic_title")
    inlines = [ServiceSectionInline]

    def section_count(self, obj):
        return obj.sections.count()

    section_count.short_description = "Sections"


@admin.register(ServicesDescriptionSection)
class ServicesDescriptionSectionAdmin(admin.ModelAdmin):
    list_display = ("english_title", "arabic_title")


@admin.register(ServicesPageMetadata)
class ServicesPageMetadataAdmin(admin.ModelAdmin):
    list_display = ("english_page_title_for_metadata", "arabic_page_title_for_metadata")