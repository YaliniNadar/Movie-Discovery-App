# pylint: disable=missing-module-docstring
import os
import requests
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

# used this resource: https://developers.google.com/youtube/v3/docs/search/list
BASE_URL = "https://youtube.googleapis.com/youtube/v3/search"

VID_URL = "https://www.youtube.com/watch?v="


def get_trailer_link(title):
    """Returns a Youtube link to the movie trailer"""
    params = {
        "key": os.getenv("YOUTUBE_KEY"),
        "part": "id",
        "format": "json",
        "q": title + " Trailer",
    }

    try:
        response = requests.get(BASE_URL, params=params)
        info = response.json()
        video_id = info["items"][0]["id"]["videoId"]
        v_link = VID_URL + video_id
    except:  # pylint: disable=bare-except
        v_link = "https://www.youtube.com/"

    return v_link
