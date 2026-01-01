from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Blog)

class SingleBlogMetaTagInline(admin.TabularInline):
    model = SingleBlogMetaTag
    extra = 1   
class SingleBlogMetadataAdmin(admin.ModelAdmin):
    inlines = [SingleBlogMetaTagInline]
admin.site.register(SigngleBlogMetadata, SingleBlogMetadataAdmin)

class BlogsPageMetaTagInline(admin.TabularInline):
    model = BlogsPageMetaTag
    extra = 1

class BlogsPageMetaTagAdmin(admin.ModelAdmin):
    inlines = [BlogsPageMetaTagInline]

admin.site.register(BlogsPageMetadata, BlogsPageMetaTagAdmin)