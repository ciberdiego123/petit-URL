from database.db import db
from _datetime import datetime


class Website(db.Document):
    url = db.StringField(required=True, unique=True)
    code = db.StringField(required=True, unique=True)
    creation_date = db.DateTimeField()

    def save(self, *args, **kwargs):
        if not self.creation_date:
            self.creation_date = datetime.now()
        return super(Website, self).save(*args, **kwargs)

