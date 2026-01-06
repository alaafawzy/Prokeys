from django.db import models


class MetaTag(models.Model):
	ATTRIBUTE_TYPE_CHOICES = (
		('name', 'Name'),
		# ('property', 'Property'),
	)

	attribute_type = models.CharField(
		max_length=10,
		choices=ATTRIBUTE_TYPE_CHOICES,
		help_text="Choose between 'name' or 'property' attribute",
		default='name',
	)
	meta_name = models.CharField(
		max_length=255,
		default='description',
		help_text="Meta tag name (e.g., 'description', 'og:title', 'twitter:card')",
	)
	meta_content = models.TextField(
		help_text="Meta tag content/value",
	)
	page = models.ForeignKey('Metadata', related_name='meta_tags', on_delete=models.CASCADE)

	def __str__(self):
		return self.meta_name


class Metadata(models.Model):
	page_title = models.CharField(
		max_length=255,
		help_text="Page title displayed in browser tab and as main heading",
	)

	def __str__(self):
		return self.page_title

