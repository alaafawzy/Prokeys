from django.db import models
from ckeditor.fields import RichTextField
from django.utils.text import slugify
import re
import os
from django.core.validators import FileExtensionValidator
# Create your models here.
def attachment(instance, filename):
    base_name, ext = os.path.splitext(filename)
    base_name = sanitize_file_name(base_name)
    return 'news/{}/{}{}'.format(instance.id, base_name, ext)

def sanitize_file_name(filename):
    # Remove all non-alphanumeric characters from the filename
    filename = re.sub(r'[^\w\s-]', '', filename)

    # Replace whitespace with hyphens
    filename = filename.strip().replace(' ', '-')

    # Use Django's slugify function to convert the filename to a URL-safe string
    filename = slugify(filename)
class Blog(models.Model):
    english_title = models.CharField(max_length=255)
    arabic_title = models.CharField(max_length=255)
    english_description = models.TextField()
    arabic_description = models.TextField()
    english_slug = models.SlugField(max_length=255, blank=True, null=True, unique=True, allow_unicode=True)
    arabic_slug = models.SlugField(max_length=255, blank=True, null=True, unique=True, allow_unicode=True)
    image = models.FileField(upload_to=attachment, blank=True, null=True,
        validators=[
            FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'gif','webm'])
        ])
    # image_alt_text = models.CharField(max_length=255, blank=True, null=True)
    english_alt = models.CharField(max_length=255, blank=True, null=True)
    arabic_alt = models.CharField(max_length=255, blank=True, null=True)
    english_content = RichTextField(null=True,blank=True)
    arabic_content = RichTextField(null=True,blank=True)
    english_page_title_for_metadata = models.CharField(max_length=255,blank=True, null=True,
                                  help_text="Page title displayed in browser tab and as main heading")
    arabic_page_title_for_metadata = models.CharField(max_length=255,blank=True, null=True,
                                  help_text="Page title displayed in browser tab and as main heading")
    english_page_description_for_metadata = models.TextField(blank=True, null=True,
                                        help_text="Meta description for SEO purposes")
    arabic_page_description_for_metadata = models.TextField(blank=True, null=True,
                                        help_text="Meta description for SEO purposes")

    def save(self, *args, **kwargs):
        # Auto-generate slugs from titles if not provided
        if self.english_title and not self.english_slug:
            # Allow hyphens and Unicode characters in English slug
            base = slugify(self.english_title, allow_unicode=True)
            slug = base
            counter = 1
            while Blog.objects.filter(english_slug=slug).exclude(pk=self.pk).exists():
                counter += 1
                slug = f"{base}-{counter}"
            self.english_slug = slug

        if self.arabic_title and not self.arabic_slug:
            # Allow hyphens and Arabic characters in Arabic slug
            base = slugify(self.arabic_title, allow_unicode=True)
            slug = base
            counter = 1
            while Blog.objects.filter(arabic_slug=slug).exclude(pk=self.pk).exists():
                counter += 1
                slug = f"{base}-{counter}"
            self.arabic_slug = slug

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.english_title}"
    

class BlogsPageMetadata(models.Model):
    english_page_title_for_metadata = models.CharField(max_length=255,default="Blogs",
                                  help_text="Page title displayed in browser tab and as main heading")
    arabic_page_title_for_metadata = models.CharField(max_length=255,blank=True, null=True,
                                  help_text="Page title displayed in browser tab and as main heading")
    english_page_description_for_metadata = models.TextField(blank=True, null=True,
                                        help_text="Meta description for SEO purposes")
    arabic_page_description_for_metadata = models.TextField(blank=True, null=True,
                                        help_text="Meta description for SEO purposes")
    
    def __str__(self):
        return self.english_page_title_for_metadata