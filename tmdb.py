# pylint: disable=missing-module-docstring
import os
import random
import requests
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

BASE_URL = "https://api.themoviedb.org/3/movie/"

BASE_URL_IMG = "http://image.tmdb.org/t/p/"

BASE_URL_SEARCH = "https://api.themoviedb.org/3/search"


def get_movie_info(movie_id):
    """Returns movie title, tagline, genres, poster pic as a tuple"""

    params = {"api_key": os.getenv("TMDB_KEY")}

    query = BASE_URL + movie_id
    # 568124
    response = requests.get(query, params=params)
    genres_list = []
    info = response.json()

    for i in range(len(info["genres"])):
        genres_list.append(info["genres"][i]["name"])
    title = info["title"]
    tag = info["tagline"]

    pic = BASE_URL_IMG + "/w500/" + info["poster_path"]

    return (title, tag, genres_list, pic)


def get_actor_info(actor_name):
    """Returns movie info for an actor"""

    params = {"api_key": os.getenv("TMDB_KEY"), "query": actor_name}
    query = BASE_URL_SEARCH + "/person"
    response = requests.get(query, params=params)
    actor_info = response.json()
    actor_movies_lst = actor_info["results"][0]["known_for"]  # list of movies
    movie_info = random.choice(actor_movies_lst)  # info on one movie
    return movie_info


def get_movie_id(movie_name):
    """Returns movie id for an title"""

    params = {"api_key": os.getenv("TMDB_KEY"), "query": movie_name}
    query = BASE_URL_SEARCH + "/movie"
    response = requests.get(query, params=params)
    movie_info = response.json()
    movie_id = movie_info["results"][0]["id"]

    return movie_id
