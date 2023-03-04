from django.db import models


class AdminDashboard(models.Model):
    """
    # Class representing db table
    # in which data from 'admin' table
    # in nest db will be aggregated
    # and used to create some awesome dashboard
    """
    admin_count = models.IntegerField(default=-1)
    characters_count = models.JSONField()

    def __str__(self):
        return str(self.admin_count)

    @property
    def check_admin_count(self) -> bool:
        if not self.admin_count:
            return False
        return True
