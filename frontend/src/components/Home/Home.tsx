// Libraries
import React from 'react';

// Components

// Styles

// Assets
import Ticket from "../../assets/images/movie_tickets.jpg"
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <React.Fragment>
      <h1>Welcome to MovieFiles</h1>
      <hr />
      <Link to="/movies">
        <img src={Ticket} alt="Movie Ticket" />
      </Link>
    </React.Fragment>
  )
}

export default Home;