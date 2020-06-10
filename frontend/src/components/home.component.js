import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
              <Link to="#about" className="btn-get-started scrollto">Get Started</Link>
            </div>
      
            <div className="row icon-boxes">
              <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="200">
                <div className="icon-box">
                  <div className="icon"><i className="ri-stack-line"></i></div>
                  <h4 className="title"><Link to="">Lorem Ipsum</Link></h4>
                  <p className="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>
                </div>
              </div>
      
              <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="300">
                <div className="icon-box">
                  <div className="icon"><i className="ri-palette-line"></i></div>
                  <h4 className="title"><Link to="">Sed ut perspiciatis</Link></h4>
                  <p className="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
                </div>
              </div>
      
              <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="400">
                <div className="icon-box">
                  <div className="icon"><i className="ri-command-line"></i></div>
                  <h4 className="title"><Link to="">Magni Dolores</Link></h4>
                  <p className="description">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia</p>
                </div>
              </div>
      
              <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="500">
                <div className="icon-box">
                  <div className="icon"><i className="ri-fingerprint-line"></i></div>
                  <h4 className="title"><Link to="">Nemo Enim</Link></h4>
                  <p className="description">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</p>
                </div>
              </div>
      
            </div>
          </div>
        </section>

    );
  }
}