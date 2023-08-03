// Libraries
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Components

// Styles

const Movies = () => {
  const [movies, setMovies] = useState<Array<object>>([])

  useEffect
  (() => 
    {
      let moviesList: Array<object> = 
      [
        {
          id: 1,
          title: "Goldfinger",
          release_date: "1964-09-20",
          runtime: 110,
          mpaa_rating: "13+",
          description: "James Bond must defeat Goldfinger."
        },
        {
          id: 2,
          title: "Raiders of the Lost Ark",
          release_date: "1981-06-12",
          runtime: 115,
          mpaa_rating: "PG-13",
          description: "Indiana Jones must defeat Nazis."
        },
      ];
      setMovies(moviesList)
    },[]
  );
  
  return (
    <div>
      <h2>Movies</h2>
      <hr />
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Movie</th>
            <th>Release Date</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          { movies.map((m: any) => 
            (
              <tr key={m.id}>
                <td>
                  <Link to={`/movies/${m.id}`}>{m.title}</Link>
                </td>
                <td>{m.release_date}</td>
                <td>{m.mpaa_rating}</td>
              </tr>
            )
          )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Movies;