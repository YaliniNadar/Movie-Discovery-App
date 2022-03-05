# Movie Discovery App Milestone 3

This is a movie discovery web application
that shows information about your favorite movies including
links to their wikipedia page. This data is dynamically fetched
using the TheMovieDataBase, Wikipedia, and YouTube APIs.

The app also lets the user create an account and login where they can
save a list of favorite movies by looking up the movie title or actor name.
User will be able to leave reviews and ratings for movies on the main page
and will be able to see previous comments by other users.

Newest addition is the ability to make changes to user's comments on the client side and then finally send the changes to the server using React.


### App Displays:

- Movie Title
- Movie Tagline
- Movie Genres
- Movie Poster
- Wikipedia Link
- YouTube Link to Movie Trailer\*
- User's Fav Movie List\*
- Comments and Reviews
- Search by Movie Title\*
- Search by Actor Name\*
- My Reviews Page

### Tech Stack:

- Python
  - flask for web framework
  - requests for api calls
  - SQLAlchemy for postgres db
- HTML & CSS
- Heroku for deployment environment

## Installation

1. Clone project from git hub

```bash
  git clone https://github.com/csc4350-sp22/milestone2-ynadar1.git
```

2. Install the following packages:

```bash
  pip install requests
  pip install python-dotenv
  pip install flask
  pip install flask-login
  pip install Flask-SQLAlchemy==2.1
  pip install psycopg2-binary
  pip install flask-marshmallow
  pip install marshmallow-sqlalchemy
```

3. Create a .env file to store the following as environment variables:
   <br>TMDB_KEY from https://developers.themoviedb.org/3/getting-started/introduction <br>
   YOUTUBE_KEY from https://developers.google.com/youtube/v3/getting-started

```bash
  TMDB_KEY=""
  DATABASE_URL=""
  SECRET_KEY=""
  YOUTUBE_KEY=""
```

4. open and run routes.py

```bash
  python3 app.py
```

## Questions

1.  What are at least 3 technical issues you encountered with your project milestone? How did you fix them? 

- I didn't realize how many app routes, redirects, and html pages I would need to create an app with different funtionalities. I did research on flask blueprints to organize all the templates and routes since I found myself copying and pasting the same pieces of code in multiple locations. But I ultimately decided against using it as I felt like it would take longer to become familiar with it and restrcuture my working code.
- Overall, I felt like this milestone was easier that the first one as we already had a working application with functioning api calls. It wasn't too hard to display that information differently in various pages. And since I had already taken Database Systems, setting up the relational models was pretty straighfoward.

2. What was the hardest part of the project for you, across all milestones? What is the most useful thing you learned, across all milestones?

- When creating the tables for the database, I was trying to get sql prompt to show me the contents of the User table, but I kept getting this error:"ERROR: syntax error at or near "user". Upon researching, I learned that the command should use quotes around the table name like `TABLE "user";` since it is a keyword.

- As a stretch feature, I decided to add a "Add to Favorites" button that saves a list of movies for each user and displays that list on a page. I wanted the navigation bar to have the user's name. I had to read through the [Flask-Login](https://flask-login.readthedocs.io/en/latest/#anonymous-users) documenation to find how get the current users's username. To get the current user's username, I put this on my html file `{{ current_user.username }}`

- When I was working on the "Add to Favorites" functionality, I wanted that button to work as a form that sends the movie_id to the backend to be saved into the database. So I was trying to find a way to send form values without input fields. I found this stack overflow page that helped me: <https://stackoverflow.com/questions/6612844/is-there-a-way-of-sending-form-values-without-inputs>

- While I was working on "Watch Trailer" button that takes you to the YouTube video of the movie's trailer, I learned that the YouTube API has a certain quota that restricts the number of queries you can make. It took me some time to research how to handle this since it wasn't easy to test the error. I ended up creating a try/catch block that would try taking you to the right movie trailer link, but if the limit is exhausted, then the button would take you to the YouTube homepage.

### Pylint Note\*

For certain pylint errors (especially the errors for the database models), I handled them in my settings.json file inside my .vscode folder. So they don't show up on my end but may show up on your end when you run `pylint *.py`.

## Author

- [@YaliniNadar](https://github.com/YaliniNadar)
