/* eslint-disable react/prop-types */
import React from 'react';

// eslint-disable-next-line import/prefer-default-export
export function Navbar({ username }) {
  return (
    <div>
      <div className="menu">
        <a href="/">Home</a>
        <a href="/add_fav">{username}'s List</a>
        <div className="dropdown">
          <button type="button" className="dropbtn">
            Search
          </button>
          <div className="dropdown-content">
            <a href="/search_movie">By Movie Name</a>
            <a href="/actor_info">By Actor Name</a>
          </div>
        </div>

        <div className="right">
          <a href="/hi">My Reviews</a>
          <a href="/logout">Logout</a>
        </div>
      </div>
    </div>
  );
}
