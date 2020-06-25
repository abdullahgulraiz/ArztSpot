import React, {useContext, useState} from 'react';
import axios from 'axios';
import {AuthContext} from "../../auth/AuthState";
import Cookies from 'js-cookie'

export const Login = () => {

  const { callbackUrl } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  
  const onSubmit = (e) => {
    e.preventDefault();
    let credentials = {
      email: email,
      password: password
    }
    axios
        .post("/api/v1/auth/login", credentials)
        .then(response => {
          if (response.data.success) {
            Cookies.set("bearer_token", response.data.token);
            window.location.pathname = callbackUrl;
          } else {
              setError(true);
          }
        })
        .catch(error => {
            setError(true);
        });
  }
  
  return (

      <main id="main">

        <section id="contact" className="contact">
          <div className="container" data-aos="fade-up">

            <div className="section-title">
              <h2>Sign In</h2>
              <p>Please sign in with your account details to access application features.</p>
            </div>

            <div className="row">
              <div className="col-6 offset-3">
                  { error &&
                      <div className="alert alert-danger" role="alert">
                          Could not sign in. Please check your credentials.
                      </div>
                  }
                <form onSubmit={onSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type={"text"} className={"form-control"} id={"email"} placeholder={"Email"} name={"email"} required={"required"} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type={"password"} className={"form-control"} id={"password"} placeholder={"Password"} name={"password"} required={"required"} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className="row" style={{marginTop: "3%"}}>
                    <div className="col-6 offset-3 text-center">
                      <button type="submit" className="btn btn-primary">Sign in</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>

  );
}