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


class Metadata(models.Model):
    
    english_page_title_for_metadata = models.CharField(max_length=255,default="About Us",
                                  help_text="Page title displayed in browser tab and as main heading")
    arabic_page_title_for_metadata = models.CharField(max_length=255,blank=True, null=True,
                                  help_text="Page title displayed in browser tab and as main heading")
    english_page_description_for_metadata = models.TextField(blank=True, null=True,
                                        help_text="Meta description for SEO purposes")
    arabic_page_description_for_metadata = models.TextField(blank=True, null=True,
                                        help_text="Meta description for SEO purposes")
    
    def __str__(self):
        return self.english_page_title_for_metadata