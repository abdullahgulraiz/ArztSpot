import React, { Component } from 'react';

export default class Unauthorized extends Component {

  render() {
    return (

      <main id="main">

      <section id="about" className="about">
        <div className="container" data-aos="fade-up">
  
          <div className="section-title">
            <h2>Error 403</h2>
          </div>
  
          <div className="row content">
            <div className="col-lg-6 offset-3">
              <p className="text-center">
                <b>Sorry, you do not have permission to access the requested page.</b>
              </p>
              <p className="text-center" style={{margin: '5% 0 0 0',}}>
                Please contact us if you think something is broken.
              </p>
            </div>
          </div>
  
        </div>
      </section>
      </main>

    );
  }
}