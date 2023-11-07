// Libraries
import React, { useCallback, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'

// Components
import Alert from "./components/Alert/Alert"

// Styles

function App() {
  // Hooks
  const [jwtToken, setJWTToken] = useState<string | null>("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertClassName, setAlertClassName] = useState<string>("d-none");
  const [tickInterval, setTickInterval] = useState<any | undefined>();

  const navigate = useNavigate();

  const logout = () => {
    const requestOptions = {
      methd: "GET",
      headers:
      {
        credentials: "include",
      }
    }
    fetch("/logout", requestOptions)
    .catch(error => {
      console.log("an error occurred while attempting to logout: ", error)
    })
    .finally(() => {
      setJWTToken("");
      toggleRefresh(false);
    })
    navigate("/login")
  }

  const toggleRefresh = useCallback((status: boolean) => {
    console.log("clicked")

    if (status) {

      console.log("turning on ticking")
      let i = setInterval(() => {
        
        const requestOptions = {
          method: "GET",
          headers: 
          {
          credentials: "include",
          }
        }
        fetch('/refresh', requestOptions)
        .then((response) => response.json())
        .then((data) => {
        if(data.access_token) {
          setJWTToken(data.access_token);
          toggleRefresh(true);
        }
      })
      .catch(error => {
        console.log("user is not logged in", error);
      })
      }, 600000);
      setTickInterval(i)
      console.log("Setting tick interval to: ", i);
      
    } else {
      console.log("Turning off ticking");
      console.log("Turning off tick interval: ", tickInterval);
      setTickInterval(null)
      clearInterval(tickInterval);
    }
  }, [tickInterval])

  useEffect(() => {
    if (jwtToken === "") {
      const requestOptions = {
        method: "GET",
        headers: 
        {
        credentials: "include",
        }
      }
      fetch('/refresh', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if(data.access_token) {
          setJWTToken(data.access_token);
          toggleRefresh(true);
        }
      })
      .catch(error => {
        console.log("user is not logged in", error);
      })
    }
  }, [jwtToken, toggleRefresh])

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-3">Welcome to MovieFiles</h1>
        </div>
        <div className="col text-end"></div>
        <div className="col text-end">
          { jwtToken === ""
          ? (<Link to="/login"><span className="badge bg-success">Login</span></Link>)
          : (<a href='#!' onClick={logout}><span className="badge bg-danger">Logout</span></a>)
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
          <Alert message={alertMessage} className={alertClassName} />
          <Outlet context={{ jwtToken, setJWTToken, setAlertClassName, setAlertMessage, toggleRefresh }}/>
        </div>
      </div>
    </div>
  );
}

export default App;
