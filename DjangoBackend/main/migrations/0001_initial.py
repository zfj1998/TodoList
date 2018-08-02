# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TodoItem',
            fields=[
                ('item_key', models.CharField(max_length=128, serialize=False, primary_key=True)),
                ('text', models.CharField(max_length=256)),
                ('finish', models.BooleanField(default=False)),
            ],
            options={
                'ordering': ('item_key',),
            },
        ),
    ]
