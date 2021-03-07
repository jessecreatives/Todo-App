from django.db import models

class Todo(models.Model):
    """Model definition for Todo."""

    name = models.CharField(max_length=150)

    PRIORITIES = [
        ('1', 'High'),
        ('2', 'Medium'),
        ('3', 'Low')
    ]
    priority = models.CharField(max_length=10, choices=PRIORITIES, default='1')
    completed = models.BooleanField(default=False)


    class Meta:
        """Meta definition for Todo."""

        verbose_name = 'Todo'
        verbose_name_plural = 'Todos'

    def __str__(self):
        """Unicode representation of Todo."""
        return self.name

