// Libraries
import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';

// Components
import Input from '../form/Input';
import { error } from 'console';

// Styles


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { setJWTToken } = useOutletContext<any>();
  const { setAlertMessage } = useOutletContext<any>();
  const { setAlertClassName } = useOutletContext<any>();

  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // build request paylod
    let payload = 
    {
      email: email,
      password: password,
    }

    const requestOptions =
    {
      method: "POST",
      headers: 
      {
        "Content-Type": "application/json",
        credentials: 'include',
      },
      //credentials: 'include',
      body: JSON.stringify(payload)
    }
    fetch(`/authenticate`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if(data.error) {
        setAlertClassName("alert-danger");
        setAlertMessage(data.message);
      } else {
        setJWTToken(data.access_token);
        setAlertClassName("d-none");
        setAlertMessage("");
        navigate("/")
      }
    })
    .catch(error => {
      setAlertClassName("alert-danger");
      setAlertMessage(error);
    })
  }

  const devLogin = (event: any) => {
    event.preventDefault();
    // build request paylod
    let payload = 
    {
      email: "admin@example.com",
      password: "secret",
    }

    const requestOptions =
    {
      method: "POST",
      headers: 
      {
        "Content-Type": "application/json",
        credentials: 'include',
      },
      //credentials: 'include',
      body: JSON.stringify(payload)
    }
    fetch(`/authenticate`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if(data.error) {
        setAlertClassName("alert-danger");
        setAlertMessage(data.message);
      } else {
        setJWTToken(data.access_token);
        setAlertClassName("d-none");
        setAlertMessage("");
        navigate("/")
      }
    })
    .catch(error => {
      setAlertClassName("alert-danger");
      setAlertMessage(error);
    })
  }

  return (
    <React.Fragment>
      <div className="col-md-6 offset-md-3">
        <div>Login</div>
        <hr />

        <form onSubmit={handleSubmit}>
          <Input 
            title="Email Address"
            type="email"
            className="form-control"
            name="email"
            autoComplete="email-new"
            onChange={(event:any) => setEmail(event.target.value)} 
          />
          <Input 
            title="Password"
            type="password"
            className="form-control"
            name="password"
            autoComplete="password-new"
            onChange={(event: any) => setPassword(event.target.value)} 
          />
          <hr />
          <input 
            type="submit"
            value="Login"
            className="btn btn-primary"
          />
        </form>
        <form onSubmit={devLogin}>
          <input 
            type="submit"
            value="Dev Login"
            className="btn btn-primary"
          />
        </form>
      </div>
    </React.Fragment>
    
  )
}

export default Login;