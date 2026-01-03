from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator, FileExtensionValidator
from django.utils.text import slugify
import re
import os
from authentication.models import CustomUser
from ckeditor.fields import RichTextField
from tinymce.models import HTMLField

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

    return filename



class New(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    img = models.FileField(upload_to=attachment, blank=True, null=True,
        validators=[
            FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'gif','webm'])
        ])
    # image_alt_text = models.CharField(max_length=255, blank=True, null=True)
    english_alt = models.CharField(max_length=255, blank=True, null=True)
    arabic_alt = models.CharField(max_length=255, blank=True, null=True)
    def __str__(self):
        return f"{self.name}"

class FAQ(models.Model):
    english_question = models.CharField(max_length=350)
    english_answer = models.CharField(max_length=5000)
    arabic_question = models.CharField(max_length=350)
    arabic_answer = models.CharField(max_length=5000)

    def __str__(self):
        return f"{self.english_question}"

class Footer(models.Model):
    english_address=models.CharField(max_length=255)
    arabic_address=models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, blank=True, null=True)
    facebook_url = models.URLField(blank=True, null=True)
    instagram_url = models.URLField(blank=True, null=True)
    twitter_url = models.URLField(blank=True, null=True)
    youtube_url = models.URLField(blank=True, null=True)
    linkedin_url = models.URLField(blank=True, null=True)
    whatsapp_url = models.URLField(blank=True, null=True)
    
    def __str__(self):
        return "Footer Links"

class Comment(models.Model):
    english_name = models.CharField(max_length=255)
    arabic_name = models.CharField(max_length=255)
    english_job_title = models.CharField(max_length=255, blank=True)
    arabic_job_title = models.CharField(max_length=255, blank=True)
    english_description = models.TextField()
    arabic_description = models.TextField()
    rate = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text="Rating from 1 to 5 stars",default=5
    )
    created_at = models.DateField()
    # is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.english_name} - {self.rate} stars"

class HomeStarting(models.Model):
    english_title = models.CharField(max_length=255)
    arabic_title = models.CharField(max_length=255)
    arabic_subtitle = models.CharField(max_length=400)
    english_subtitle = models.CharField(max_length=400)
    english_description = models.TextField()
    arabic_description = models.TextField()
    image = models.FileField(upload_to='home_starting/', blank=True, null=True,
        validators=[
            FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'gif','webm'])
        ])
    # image_alt_text = models.CharField(max_length=255, blank=True, null=True)
    english_alt = models.CharField(max_length=255, blank=True, null=True)
    arabic_alt = models.CharField(max_length=255, blank=True, null=True)
    def __str__(self):
        return f"{self.english_title}"

class WhoWeAre(models.Model):
    english_title = models.CharField(max_length=255)
    arabic_title = models.CharField(max_length=255)
    english_description = models.TextField()
    arabic_description = models.TextField()
    image = models.FileField(upload_to='who_we_are/', blank=True, null=True,
        validators=[
            FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'gif','webm'])
        ])
    # image_alt_text = models.CharField(max_length=255, blank=True, null=True)
    english_alt = models.CharField(max_length=255, blank=True, null=True)
    arabic_alt = models.CharField(max_length=255, blank=True, null=True)
    def __str__(self):
        return f"{self.english_title}"
    
class CustomerAndPartner(models.Model):
    name = models.CharField(max_length=255)
    image = models.FileField(upload_to='customers_and_partners/', blank=True, null=True,
        validators=[
            FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'gif','webm'])
        ])
    # image_alt_text = models.CharField(max_length=255, blank=True, null=True)
    english_alt = models.CharField(max_length=255, blank=True, null=True)
    arabic_alt = models.CharField(max_length=255, blank=True, null=True)
    def __str__(self):
        return f"{self.name}"

class SystemPartner(models.Model):
    name = models.CharField(max_length=255)
    logo = models.FileField(upload_to='system_partners/', blank=True, null=True,
        validators=[
            FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'])
        ])
    # logo_alt_text = models.CharField(max_length=255, blank=True, null=True)
    english_alt = models.CharField(max_length=255, blank=True, null=True)
    arabic_alt = models.CharField(max_length=255, blank=True, null=True)
    # order = models.IntegerField(default=0, help_text="Display order (lower numbers appear first)")
    # is_active = models.BooleanField(default=True)
    
    # class Meta:
        # ordering = ['' 'name']
    
    def __str__(self):
        return f"{self.name}"

class MetaTag(models.Model):
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
    page = models.ForeignKey('Metadata', related_name='meta_tags', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.meta_name


class Metadata(models.Model):
    page_title = models.CharField(max_length=255,
                                  help_text="Page title displayed in browser tab and as main heading")
    
    def __str__(self):
        return self.page_title