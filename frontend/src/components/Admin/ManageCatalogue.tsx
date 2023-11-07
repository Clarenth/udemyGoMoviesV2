// Libraries
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

// Components

// Styles


const ManageCatalogue = () => {
  const [movies, setMovies] = useState<Array<object>>([])
  const { jwtToken } = useOutletContext<any>();

  const navigate = useNavigate()

  useEffect
  (() => 
    {
      if (jwtToken === "") {
        navigate("/login")
      }
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", "Bearer " + jwtToken)

      const requestOptions =
      {
        method: "GET",
        headers: headers,
      }

      fetch(`/admin/movies`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setMovies(data);
        })
        .catch(err => { console.log(err) });
    },[jwtToken, navigate]
  );
  
  return (
    <div>
      <h2>Manage Catalogue</h2>
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
                  <Link to={`/admin/movies/${m.id}`}>{m.title}</Link>
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

export default ManageCatalogue;