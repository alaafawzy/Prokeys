
from django.db import models
from ckeditor.fields import RichTextField

class Service(models.Model):
    english_title = models.CharField(max_length=255)
    arabic_title = models.CharField(max_length=255)
    english_description = models.TextField()
    arabic_description = models.TextField()
    english_page_title_for_metadata = models.CharField(max_length=255, blank=True, null=True,
                                  help_text="Page title displayed in browser tab and as main heading")
    arabic_page_title_for_metadata = models.CharField(max_length=255, blank=True, null=True,
                                  help_text="Page title displayed in browser tab and as main heading")
    english_page_description_for_metadata = models.TextField(blank=True, null=True,
                                        help_text="Meta description for SEO purposes")
    arabic_page_description_for_metadata = models.TextField(blank=True, null=True,
                                        help_text="Meta description for SEO purposes")
    
    def __str__(self):
        return self.english_title

class ServiceSection(models.Model):
    service = models.ForeignKey(Service, related_name='sections', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='service_sections/', blank=True, null=True)
    # image_alt_text = models.CharField(max_length=255, blank=True, null=True)
    english_alt = models.CharField(max_length=255, blank=True, null=True)
    arabic_alt = models.CharField(max_length=255, blank=True, null=True)
    english_content = RichTextField(null=True, blank=True)
    arabic_content = RichTextField(null=True, blank=True)

    def __str__(self):
        return f"Section of {self.service.english_title}"





class ServicesPageMetadata(models.Model):
    
    english_page_title_for_metadata = models.CharField(max_length=255,default="Services",
                                  help_text="Page title displayed in browser tab and as main heading")
    arabic_page_title_for_metadata = models.CharField(max_length=255,blank=True, null=True,
                                  help_text="Page title displayed in browser tab and as main heading")
    english_page_description_for_metadata = models.TextField(blank=True, null=True,
                                        help_text="Meta description for SEO purposes")
    arabic_page_description_for_metadata = models.TextField(blank=True, null=True,
                                        help_text="Meta description for SEO purposes")
    
    def __str__(self):
        return self.english_page_title_for_metadata


class ServicesDescriptionSection(models.Model):
    english_title = models.CharField(max_length=255, default='Our Services')
    arabic_title = models.CharField(max_length=255, default='خدماتنا')
    english_description = models.TextField()
    arabic_description = models.TextField()
    image = models.ImageField(upload_to='services/', blank=True, null=True)
    # image_alt_text = models.CharField(max_length=255, blank=True, null=True, default='Professional')
    english_alt = models.CharField(max_length=255, blank=True, null=True)
    arabic_alt = models.CharField(max_length=255, blank=True, null=True)
    
    class Meta:
        verbose_name_plural = "Description Sections"
    
    def __str__(self):
        return "Services Description Section"