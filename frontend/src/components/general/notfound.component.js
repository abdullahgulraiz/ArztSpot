import React, { Component } from 'react';

export default class NotFound extends Component {

  render() {
    return (

      <main id="main">

      <section id="about" className="about">
        <div className="container" data-aos="fade-up">
  
          <div className="section-title">
            <h2>Page Not Found</h2>
          </div>
  
          <div className="row content">
            <div className="col-12">
              <p className="text-center">
                <b>Sorry, the page you are looking for does not exist.</b>
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