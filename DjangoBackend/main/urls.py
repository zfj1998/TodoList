from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from main import views

urlpatterns =[
    url(r'^list/$', views.TodoItemList.as_view()),
    url(r'^detail/(?P<pk>[0-9]+)/$', views.TodoItemDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)