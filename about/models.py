from django.db import models
from django.core.validators import FileExtensionValidator
from ckeditor.fields import RichTextField

# Create your models here.
class AboutUs(models.Model):
    english_title = models.CharField(max_length=255)
    arabic_title = models.CharField(max_length=255)
    english_description = RichTextField()
    arabic_description = RichTextField()
    # content = RichTextField(null=True, blank=True)
    
    def __str__(self):
        return self.english_title


class AboutSection(models.Model):
    arabic_title = models.CharField(max_length=255)
    english_title = models.CharField(max_length=255)
    english_content = RichTextField()
    arabic_content = RichTextField()
    section_image = models.FileField(upload_to='about_section', blank=True, null=True,
        validators=[
            FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'gif', 'webm'])
        ])
    # image_alt_text = models.CharField(max_length=255, blank=True, null=True)
    english_alt = models.CharField(max_length=255, blank=True, null=True)
    arabic_alt = models.CharField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        return f"{self.english_title}"





class MetaTag(models.Model):
    ATTRIBUTE_TYPE_CHOICES = (
        ('name', 'Name'),
        # ('property', 'Property'),
    )
    attribute_type = models.CharField(max_length=10, choices=ATTRIBUTE_TYPE_CHOICES,
                                      help_text="Choose between 'name' or 'property' attribute",default='name')
    meta_name = models.CharField(max_length=255,
                                 help_text="Meta tag name (e.g., 'description', 'og:title', 'twitter:card')",default='description')
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