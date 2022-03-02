# pylint: disable=missing-module-docstring
import re
import requests
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

BASE_URL = "https://en.wikipedia.org/w/api.php"


def get_movie_link(title):
    """Returns a wikipedia link to the movie"""

    params = {
        "action": "opensearch",
        "format": "json",
        "search": title,
    }

    response = requests.get(BASE_URL, params=params)
    wiki_info = response.json()
    url_list = wiki_info[3]  # list of urls

    # improves accuracy by searching for url that ends w "film"
    if len(url_list) <= 2:
        return url_list[0]
    for url in url_list:
        valid_url = re.match(r".*film\)", url)
        if bool(valid_url):
            return url
    return url_list[0]
