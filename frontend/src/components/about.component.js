import React, { Component } from 'react';

export default class About extends Component {

  render() {
    return (

      <main id="main">

      <section id="about" class="about">
        <div class="container" data-aos="fade-up">
  
          <div class="section-title">
            <h2>About</h2>
          </div>
  
          <div class="row content">
            <div class="col-lg-8 offset-2">
              <p class="text-center">
                  We are a start up company which aims to give our customers <br />- the <i>patients</i> and the <i>healthcare institutions</i> - <br />a solution to digitalize appointments by 
                  means of our Online Platform <br />which enables <b>instant booking</b> and <b>simultaneous synchronization</b> with the <br />Institution’s internal agenda.
              </p>
            </div>
          </div>
  
        </div>
      </section>
      </main>

    );
  }
}