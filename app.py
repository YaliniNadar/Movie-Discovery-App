# pylint: disable=missing-module-docstring
# pylint: disable=no-member
# pylint: disable=too-few-public-methods
import os
import random
from dotenv import load_dotenv, find_dotenv
from flask import render_template, request, redirect, url_for, flash, Flask, Blueprint, jsonify
from flask_login import (
    LoginManager,
    login_user,
    logout_user,
    login_required,
    current_user,
    UserMixin,
)
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_marshmallow import Marshmallow
from tmdb import get_actor_info, get_movie_info, get_movie_id
from wiki import get_movie_link
from youtube import get_trailer_link

load_dotenv(find_dotenv())
app = Flask(__name__)
bp = Blueprint(
    "bp",
    __name__,
    template_folder="./static/react",
)

db_url = os.getenv("DATABASE_URL")
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = db_url
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["SESSION_TYPE"] = "filesystem"
app.config['TESTING'] = False

# Initialize the database
db = SQLAlchemy(app)
ma = Marshmallow(app)


login_manager = LoginManager()
login_manager.login_view = "login"
login_manager.init_app(app)


class User(db.Model, UserMixin):
    """Sets up table Users for db"""

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(120), nullable=False, unique=True)

    def __repr__(self):
        return f"<User {self.username}>"


class Review(db.Model):
    """Sets up table Review for db"""

    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.Integer)
    username = db.Column(db.String(20), nullable=False)
    comment = db.Column(db.String(280))
    rating = db.Column(db.Integer)

    def __repr__(self):
        return f"<Review {self.username, self.movie_id, self.rating}>"


class Favlist(db.Model):
    """Sets up table Favlist for db"""

    movie_id = db.Column(db.Integer, primary_key=True, nullable=False)
    username = db.Column(db.String(20), primary_key=True, nullable=False)
    title = db.Column(db.String(80), nullable=False)
    img = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f"<Favlist {self.username, self.movie_id}>"

#Defining output format
class ReviewSchema(ma.Schema):
    """To Define output format for Review"""
    class Meta:
        """Format"""
        fields = ("username", "movie_id", "comment", "rating")


db.create_all()

# set up a separate route to serve the main.html file generated
# by create-react-app/npm run build.
# By doing this, we make it so you can paste in all your old app routes
# from Milestone 2 without interfering with the functionality here.


@login_manager.user_loader
def load_user(user_id):
    """To associate the id in the cookie with the actual user"""
    return User.query.get(int(user_id))


@app.route("/logout")
@login_required
def logout():
    """Logs out user"""
    logout_user()
    return redirect(url_for("login"))

# route for serving React page
@app.route("/")
@login_required
def index():
    """Driver Code"""
    # NB: DO NOT add an "main.html" file in your normal templates folder
    # Flask will stop serving this React page correctly
    movies_list = [634649, 568124, 566525, 354912, 284054, 4523, 671, 38575, 411]
    movie_id = random.choice(movies_list)

    title, tag, genres_list, pic = get_movie_info(str(movie_id))

    wiki_url = get_movie_link(title)

    trailer = get_trailer_link(title)

    reviews = Review.query.filter_by(movie_id=movie_id).all()
    return render_template(
        "main.html",
        movie_id=movie_id,
        name=title,
        tag=tag,
        genres=genres_list,
        pic=pic,
        link=wiki_url,
        reviews=reviews,
        trailer=trailer,
        )


@bp.route('/hello')
def say_hello_world():
    """Testing"""
    return {'result': "Hello Worlda"}

@bp.route('/hi')
def say_hi():
    """test"""
    return render_template("index.html")

@bp.route('/load_info')
def load_info():
    """Sending info to react side"""
    username = current_user.username
    user_reviews = Review.query.filter_by(username=username).all()
    print(user_reviews)
    reviews_schema = ReviewSchema(many=True)
    output = reviews_schema.dump(user_reviews) #converts to a serializeable obj
    data = {
        'username': username,
        'reviews': output
        }
    return jsonify(data)

app.register_blueprint(bp)

@app.route("/actor_info", methods=["GET", "POST"])
@login_required
def actor_info():
    """Driver Code for Actor Info Page"""
    if request.method == "POST":
        actor = request.form["actor"]

        # error handling
        try:
            movie_info = get_actor_info(actor)
            title, tag, genres_list, pic = get_movie_info(str(movie_info["id"]))
            wiki_url = get_movie_link(title)
            trailer = get_trailer_link(title)

            reviews = Review.query.filter_by(movie_id=str(movie_info["id"])).all()

            return render_template(
                "actor_info.html",
                title=title,
                tag=tag,
                genres=genres_list,
                pic=pic,
                link=wiki_url,
                movie_info=movie_info,
                trailer=trailer,
                reviews=reviews,
                movie_id=movie_info["id"],
            )
        except (KeyError, IndexError):
            error_statement = "Check Spelling"
            return render_template("fail.html", error_statement=error_statement)

    return render_template("actor_info.html")


@app.route("/search_movie", methods=["GET", "POST"])
@login_required
def search_movie():
    """Driver Code for Movie Info Page"""
    if request.method == "POST":
        movie = request.form["movie"]

        # error handling
        try:
            movie_id = get_movie_id(movie)
            title, tag, genres_list, pic = get_movie_info(str(movie_id))
            wiki_url = get_movie_link(title)
            trailer = get_trailer_link(title)
            reviews = Review.query.filter_by(movie_id=str(movie_id)).all()
            return render_template(
                "search_movie.html",
                title=title,
                tag=tag,
                genres=genres_list,
                pic=pic,
                link=wiki_url,
                user=current_user.username,
                trailer=trailer,
                reviews=reviews,
                movie_id=movie_id,
            )
        except (KeyError, IndexError, TypeError):
            error_statement = "Check Spelling"
            return render_template("fail.html", error_statement=error_statement)

    return render_template("search_movie.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    """Driver Code for Login Page"""
    if request.method == "POST":

        username = request.form["username"]
        password = request.form["password"]

        user = User.query.filter_by(username=username).first()

        if user and check_password_hash(user.password, password):

            # creates cookie and session
            login_user(user)
            return redirect(url_for("index"))
        flash("The username or password is incorrect")

    return render_template("login.html")

@app.route("/sign_up", methods=["GET", "POST"])
def sign_up():
    """Driver Code for Sign Up Page"""
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]

        user = User.query.filter_by(username=username).first()

        if user:
            flash("Username already exists")
            return redirect(url_for("sign_up"))

        new_user = User(username=username, password=generate_password_hash(password))

        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for("login"))
    return render_template("sign_up.html")

@app.route("/handle_form", methods=["GET", "POST"])
def handle_form():
    """Driver Code for handling main form"""
    if request.method == "POST":
        rating = request.form.get("star")  # default is none
        comment = request.form["comment"]
        user = current_user.username
        movie_id = request.form["movie_id"]

        review = Review(
            movie_id=movie_id, username=user, comment=comment, rating=rating
        )
        db.session.add(review)
        db.session.commit()

        reviews = Review.query.filter_by(movie_id=movie_id).all()

        title, tag, genres_list, pic = get_movie_info(str(movie_id))
        wiki_url = get_movie_link(title)
        trailer = get_trailer_link(title)

        return render_template(
            "main.html",
            rating=rating,
            comment=comment,
            user=user,
            movie_id=movie_id,
            reviews=reviews,
            name=title,
            tag=tag,
            genres_list=genres_list,
            pic=pic,
            link=wiki_url,
            trailer=trailer,
        )
    return render_template("main.html")

@app.route("/add_fav", methods=["POST", "GET"])
def add_fav():
    """Adds show to favs"""
    username = current_user.username
    if request.method == "POST":
        movie_id = request.form.get("fav_movie")  # default is none
        title = get_movie_info(str(movie_id))[0]
        img = get_movie_info(str(movie_id))[3]

        exists = (
            Favlist.query.filter_by(movie_id=movie_id)
            .filter_by(username=username)
            .first()
        )
        if not exists:
            movie = Favlist(movie_id=movie_id, username=username, title=title, img=img)
            db.session.add(movie)
            db.session.commit()
        favlist = Favlist.query.filter_by(username=username).all()
        return render_template("fav_list.html", favlist=favlist)

    favlist = Favlist.query.filter_by(username=username).all()
    return render_template("fav_list.html", favlist=favlist)


app.run(debug=True)
