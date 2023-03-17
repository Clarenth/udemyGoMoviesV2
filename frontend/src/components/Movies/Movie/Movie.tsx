// Libraries
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Components

// Styles

interface keyable {
  [key: string]: any
}

const Movie = () => {
  const [movie, setMovie] = useState<keyable>({});

  let { id } = useParams();

  useEffect( () => 
    {
      let tempMovie: keyable = 
      {
        id: 1,
        title: "Goldfinger",
        release_date: "1964-09-20",
        runtime: 110,
        mpaa_rating: "13+",
        description: "James Bond must defeat Goldfinger."
      }
      setMovie(tempMovie)
    }, [id]
  )

  return (
    <div>
      <h2>Movie: { movie.title }</h2>
      <p><em>{ movie.release_date }, { movie.runtime } minutes, Rated: { movie.mpaa_rating }</em></p>
      <hr />
      <p>{ movie.description }</p>
    </div>
  )
}

export default Movie;