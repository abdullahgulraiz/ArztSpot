import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reverse } from 'named-urls'
import routes from "../../routes";

export default class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { email, password, password_confirmation } = this.state;
    console.log(this.state);
    console.log(email, password);
  /*
    axios
        .post(
            "http://localhost:3001/sessions",
            {
              user: {
                email: email,
                password: password
              }
            },
            { withCredentials: true }
        )
        .then(response => {
          if (response.data.logged_in) {
            this.props.handleSuccessfulAuth(response.data);
          }
        })
        .catch(error => {
          console.log("login error", error);
        });
    */
    event.preventDefault();
  }


  render() {
    return (

      <main id="main">

        <section id="contact" class="contact">
          <div class="container" data-aos="fade-up">

            <div class="section-title">
              <h2>Sign Up</h2>
              <p>Please enter your details to create an account with ArztSpot.</p>
            </div>

            <div className="row">
              <div className="col-6 offset-3">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type={"text"} onChange={this.handleChange} className={"form-control"} id={"name"} placeholder={"Name"} name={"name"} required={"required"} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input type={"text"} onChange={this.handleChange} className={"form-control"} id={"lastname"} placeholder={"Last Name"} name={"lastname"} required={"required"} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type={"text"} onChange={this.handleChange} className={"form-control"} id={"email"} placeholder={"Email"} name={"email"} required={"required"} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type={"password"} onChange={this.handleChange} className={"form-control"} id={"password"} placeholder={"Password"} name={"password"} required={"true"} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password_confirmation">Confirm Password</label>
                    <input type={"password"} onChange={this.handleChange} className={"form-control"} id={"password_confirmation"} placeholder={"Confirm Password"} name={"password_confirmation"} required={"true"} />
                  </div>
                  <div className="row" style={{marginTop: "3%"}}>
                      <div className="col-6 offset-3 text-center">
                          <button type="submit" className="btn btn-primary">Sign up</button>
                          <div className="section-title" style={{marginTop: "3%"}}>
                              <p>By signing up, you agree to ArztSpot's <a href="#" className="alert-link">Terms of Use</a> and <a href="#" className="alert-link">Privacy Policy</a>.</p>
                          </div>
                          <div className="section-title" style={{marginTop: "3%"}}>
                              <p>Already signed up? <a href="auth/login" className="alert-link">Log in</a> with your account</p>
                          </div>
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
}