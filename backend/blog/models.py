from django.db import models

class Article(models.Model):
    title= models.CharField(max_length=255)
    content=models.TextField("Write something")

    def __str__(self):
        return self.title

