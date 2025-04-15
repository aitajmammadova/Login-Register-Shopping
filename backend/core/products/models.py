from django.db import models

# Create your models here.
class Product(models.Model):
    name=models.CharField(max_length=300)
    description=models.TextField(blank=True, null=True)
    price=models.PositiveIntegerField()
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name