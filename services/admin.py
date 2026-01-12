from django.contrib import admin

from services.models import Service, ServiceSection, ServicesPageMetadata, ServicesDescriptionSection


class ServiceSectionInline(admin.TabularInline):
    model = ServiceSection
    extra = 1


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    inlines = [ServiceSectionInline]


@admin.register(ServicesDescriptionSection)
class ServicesDescriptionSectionAdmin(admin.ModelAdmin):
    list_display = ("english_title", "arabic_title")


@admin.register(ServicesPageMetadata)
class ServicesPageMetadataAdmin(admin.ModelAdmin):
    list_display = ("english_page_title_for_metadata", "arabic_page_title_for_metadata")