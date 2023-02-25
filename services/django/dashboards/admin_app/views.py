from django.http import HttpResponse


# To be used
# https://django-plotly-dash.readthedocs.io/en/latest/introduction.html
def index(request):
    return HttpResponse('dashboard here')
