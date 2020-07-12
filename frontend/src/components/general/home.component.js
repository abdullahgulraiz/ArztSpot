import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from "../../routes";

export default class Home extends Component {

  render() {
    return (

        <section id="hero" className="d-flex align-items-center">
          <div className="container position-relative" data-aos="fade-up" data-aos-delay="100">
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-9 text-center">
                <h1>Digitalized Doctor Appointments</h1>
                <h2>Now at your fingertips!</h2>
              </div>
            </div>
            <div className="text-center">
              <Link to={routes.search} className="btn-get-started scrollto">Get Started</Link>
            </div>
      
            <div className="row icon-boxes">
              <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="200">
                <div className="icon-box">
                  <div className="icon"><i className="ri-fingerprint-line"></i></div>
                  <h4 className="title"><Link to={routes.about}>Who are we?</Link></h4>
                  <p className="description">In ArztSpot we aim to provide an online platform for health appointment booking.</p>
                </div>
              </div>
      
              {/*<div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="300">*/}
              {/*  <div className="icon-box">*/}
              {/*    <div className="icon"><i className="ri-palette-line"></i></div>*/}
              {/*    <h4 className="title"><Link to={routes.search}>Book your dashboard now</Link></h4>*/}
              {/*    <p className="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>*/}
              {/*  </div>*/}
              {/*</div>*/}
      
              <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="400">
                <div className="icon-box">
                  <div className="icon"><i className="ri-user-search-line"></i></div>
                  <h4 className="title"><Link to={routes.search}>Book your appointment now</Link></h4>
                  <p className="description">Find the healthcare professional who best suits your needs - search by specialty, location or even language!</p>
                </div>
              </div>
      
              <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="500">
                <div className="icon-box">
                  <div className="icon"><i className="ri-hospital-line"></i></div>
                  <h4 className="title"><Link to={routes.auth.register}>Are you a health professional?</Link></h4>
                  <p className="description">Sign up and have a full ArztSpot experience - online agenda, e-prescriptions, prediagnosis and much more.</p>
                </div>
              </div>
      
            </div>
          </div>
        </section>

    );
  }
}