import React, { Component } from 'react';
import {reverse} from "named-urls";
import routes from "../../routes";
import {Link} from "react-router-dom";

export default class QuestionnaireSuccessful extends Component {

  render() {
    return (

      <main id="main">

      <section id="about" className="about">
        <div className="container" data-aos="fade-up">
  
          <div className="section-title">
            <h2>Appointment Booked</h2>
          </div>
  
          <div className="row content">
            <div className="col-12">
              <p className="text-center">
                <b>Your appointment has been successfully booked, and responses have been successfully sent to the doctor.</b>
              </p>
              <p className="text-center" style={{margin: '5% 0 0 0',}}>
                Thank you for booking an appointment through ArztSpot.
              </p>

              <p className="text-center" style={{margin: '5% 0 0 0',}}>
                <Link to={"/"} className="btn btn-secondary"><i className="icofont-home"></i> Home</Link>
              </p>
            </div>
          </div>
  
        </div>
      </section>
      </main>

    );
  }
}