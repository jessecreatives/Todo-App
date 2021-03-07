from django.db import models

class Todo(models.Model):
    """Model definition for Todo."""

    name = models.CharField(max_length=50)

    PRIORITIES = [
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low')
    ]
    priority = models.CharField(max_length=10, choices=PRIORITIES, default='high')
    completed = models.BooleanField(default=False)

    class Meta:
        """Meta definition for Todo."""

        verbose_name = 'Todo'
        verbose_name_plural = 'Todos'

    def __str__(self):
        """Unicode representation of Todo."""
        return self.name

