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
    image = models.FileField(upload_to=attachment, blank=True, null=True,
        validators=[
            FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'gif','webm'])
        ])
    # image_alt_text = models.CharField(max_length=255, blank=True, null=True)
    english_alt = models.CharField(max_length=255, blank=True, null=True)
    arabic_alt = models.CharField(max_length=255, blank=True, null=True)
    english_content = RichTextField(null=True,blank=True)
    arabic_content = RichTextField(null=True,blank=True)

    def __str__(self):
        return f"{self.english_title}"
    

class SingleBlogMetaTag(models.Model):
    ATTRIBUTE_TYPE_CHOICES = (
        ('name', 'Name'),
        # ('property', 'Property'),
    )
    attribute_type = models.CharField(max_length=10, choices=ATTRIBUTE_TYPE_CHOICES,
                                      help_text="Choose between 'name' or 'property' attribute",default='name')
    meta_name = models.CharField(max_length=255,default='description',
                                 help_text="Meta tag name (e.g., 'description', 'og:title', 'twitter:card')")
    meta_content = models.TextField(
                                    help_text="Meta tag content/value")
    page = models.ForeignKey('SigngleBlogMetadata', related_name='meta_tags', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.meta_name


class SigngleBlogMetadata(models.Model):
    blog = models.ForeignKey(Blog, related_name='metadata', on_delete=models.CASCADE,
                             help_text="The blog post this metadata belongs to")
    page_title = models.CharField(max_length=255,
                                  help_text="Page title displayed in browser tab and as main heading")
    
    def __str__(self):
        return self.page_title
    
class BlogsPageMetaTag(models.Model):
    ATTRIBUTE_TYPE_CHOICES = (
        ('name', 'Name'),
        # ('property', 'Property'),
    )
    attribute_type = models.CharField(max_length=10, choices=ATTRIBUTE_TYPE_CHOICES,
                                      help_text="Choose between 'name' or 'property' attribute",default='name')
    meta_name = models.CharField(max_length=255, default='description',
                                 help_text="Meta tag name (e.g., 'description', 'og:title', 'twitter:card')")
    meta_content = models.TextField(
                                    help_text="Meta tag content/value")
    page = models.ForeignKey('BlogsPageMetadata', related_name='meta_tags', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.meta_name


class BlogsPageMetadata(models.Model):
    page_title = models.CharField(max_length=255,
                                  help_text="Page title displayed in browser tab and as main heading")
    
    def __str__(self):
        return self.page_title