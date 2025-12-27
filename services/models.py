
from django.db import models
from ckeditor.fields import RichTextField

class Service(models.Model):
	english_title = models.CharField(max_length=255)
	arabic_title = models.CharField(max_length=255)
	english_description = models.TextField()
	arabic_description = models.TextField()

	def __str__(self):
		return self.english_title

class ServiceSection(models.Model):
	service = models.ForeignKey(Service, related_name='sections', on_delete=models.CASCADE)
	image = models.ImageField(upload_to='service_sections/', blank=True, null=True)
	english_content = RichTextField(null=True, blank=True)
	arabic_content = RichTextField(null=True, blank=True)
	IMAGE_POSITION_CHOICES = [
		('right', 'Right'),
		('left', 'Left'),
		('top', 'Top'),
		('bottom', 'Bottom'),
	]
	image_position = models.CharField(max_length=6, choices=IMAGE_POSITION_CHOICES, default='left')

	def __str__(self):
		return f"Section of {self.service.english_title}"
