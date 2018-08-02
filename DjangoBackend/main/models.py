from django.db import models

class TodoItem(models.Model):
    item_key = models.CharField(max_length=128, primary_key=True)
    text = models.CharField(max_length=256)
    finish = models.BooleanField(default=False)

    class Meta:
        ordering = ('item_key',)
