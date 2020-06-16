import React, { Component } from 'react';

export default class NotFound extends Component {

  render() {
    return (

      <main id="main">

      <section id="about" class="about">
        <div class="container" data-aos="fade-up">
  
          <div class="section-title">
            <h2>Page Not Found</h2>
          </div>
  
          <div class="row content">
            <div class="col-lg-6 offset-3">
              <p class="text-center">
                <b>Sorry, the page you are looking for does not exist.</b>
              </p>
              <p class="text-center" style={{margin: '5% 0 0 0',}}>
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