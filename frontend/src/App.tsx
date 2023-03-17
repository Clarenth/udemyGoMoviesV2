// Libraries
import React, { useState } from 'react';
import { Link, Outlet, } from 'react-router-dom'

// Components

// Styles

function App() {
  interface jwtTokenType {
    setJWTToken: string
  }

  const [jwtToken, setJWTToken] = useState<jwtTokenType | string | null>("")

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-3">Welcome to MovieFiles</h1>
        </div>
        <div className="col text-end">
          { jwtToken === ""
          ? <Link to="/login"><span className="badge bg-success">Login</span></Link>
          : <a href='#!'><span className="badge bg-danger">Logout</span></a>
          }
        </div>
        <hr className="mb-3"/>
      </div>

      <div className="row">
        <div className="col-md-2">
          <nav>
            <div className="list-group">
              <Link to="/" className="list-group-item list-group-item-action">Home</Link>
              <Link to="/movies" className="list-group-item list-group-item-action">Movies</Link>
              <Link to="/genres" className="list-group-item list-group-item-action">Genres</Link>
              { jwtToken !== "" && 
              <React.Fragment>
                <Link to="/admin/movie/0" className="list-group-item list-group-item-action">Add Movies</Link>
                <Link to="/manage-catalogue" className="list-group-item list-group-item-action">Manage Catalogue</Link>
                <Link to="/graphql" className="list-group-item list-group-item-action">GraphQL</Link>
              </React.Fragment>
              }
            </div>
          </nav>
        </div>
        <div className="col-md-10">
          <Outlet context={{ jwtToken, setJWTToken }}/>
        </div>
      </div>
    </div>
  );
}

export default App;
