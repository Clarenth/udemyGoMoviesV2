// Libraries
import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom';

// Components
import Input from '../form/Input';

// Styles


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { setJWTToken } = useOutletContext<any>();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("email/pass", email, password)
    if(email === "crag@tarr.gov") {
      setJWTToken("abc");
    }
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
      </div>
    </React.Fragment>
    
  )
}

export default Login;