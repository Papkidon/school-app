import json
from collections import Counter

import pandas as pd
import requests
from django.http import HttpResponse

from .utils.utils import flatten_list


def get_letter_count(data: pd.Series) -> int:
    flat_data = flatten_list(data)
    words_list = [letter.split() for letter in flat_data]
    letters_list = flatten_list(words_list)
    return dict(Counter(letters_list))

# To be used
# https://django-plotly-dash.readthedocs.io/en/latest/introduction.html


def index(request):
    return HttpResponse('dashboard here')


def aggregate(request):
    admin_data = requests.get(
        url='http://nest:3000/api/v1/admin', timeout=3)

    data = pd.DataFrame(admin_data.json())

    letters = get_letter_count(data)

    exceptions = [exc for exc in admin_data if isinstance(exc, Exception)]
    if exceptions:
        raise ExceptionGroup("Couldn't retrieve admin data: ", exceptions)

    return HttpResponse(json.dumps(letters), content_type="application/json")


def visualize(request):
    raise NotImplementedError("Visualize method is not implemented yet.")
