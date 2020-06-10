import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const DoctorActions = props => (
  <ul>
    <li><i class="bx bx-chevron-right"></i> <a href="#">Appointments</a></li>
    <li><i class="bx bx-chevron-right"></i> <a href="#">Patients</a></li>
    <li><i class="bx bx-chevron-right"></i> <a href="#">Questionnaires</a></li>
    <li><i class="bx bx-chevron-right"></i> <a href="#">Prescriptions</a></li>
  </ul>
)

const PatientActions = props => (
  <ul>
    <li><i class="bx bx-chevron-right"></i> <a href="#">Appointments</a></li>
    <li><i class="bx bx-chevron-right"></i> <a href="#">Prescriptions</a></li>
  </ul>
)

const GuestActions = props => (
  <ul>
    <li><i class="bx bx-chevron-right"></i> <a href="#">Log in / Sign up</a></li>
    <li><i class="bx bx-chevron-right"></i> <a href="#">Search for a doctor</a></li>
  </ul>
)

export default class Footer extends Component {

  constructor(props) {
      super(props);
      this.handleLogoutClick = this.handleLogoutClick.bind(this);
      this.state = {
          isLoggedIn: true,
          user: {
              username: 'johnwick',
              role: 'doctor',
              name: 'Dr. John Wick'
          }
      }
  }

  handleLogoutClick() {
      this.setState({
          isLoggedIn: false,
          user: {}
      });
  }

  render() {

    const isLoggedIn = this.state.isLoggedIn;
    let action;
    if (isLoggedIn) {
        const user = this.state.user;
        if (user.role === 'doctor') {
            action = <DoctorActions />;
        } else if (user.role === 'patient') {
            action = <PatientActions />;
        }
    } else {      
        action = <GuestActions />  
    }

    return (

      <footer id="footer">

        <div class="footer-top">
          <div class="container">
            <div class="row">

              <div class="col-lg-3 col-md-6 footer-contact">
                <h3>ArztSpot</h3>
                <p>
                  Boltzmannstraße 3 <br />
                  Garching bei München 85748<br />
                  Germany <br /><br />
                  <strong>Phone:</strong> +49 5589 55488 55<br />
                  <strong>Email:</strong> support@arztspot.de<br />
                </p>
              </div>

              <div class="col-lg-2 col-md-6 footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li><i class="bx bx-chevron-right"></i> <Link to="/faqs">FAQs</Link></li>
                  <li><i class="bx bx-chevron-right"></i> <a href="#">Terms of service</a></li>
                  <li><i class="bx bx-chevron-right"></i> <a href="#">Privacy policy</a></li>
                </ul>
              </div>

              <div class="col-lg-3 col-md-6 footer-links">
                <h4>Actions</h4>
                {action}
              </div>

              <div class="col-lg-4 col-md-6 footer-newsletter">
                <h4>Join Our Newsletter</h4>
                <p>Stay updated with latest insights on health, crafted by professionals and endorsed by doctors!</p>
                <form action="" method="post">
                  <input type="email" name="email" /><input type="submit" value="Subscribe" />
                </form>
              </div>

            </div>
          </div>
        </div>

        <div class="container d-md-flex py-4">

      <div class="mr-md-auto text-center text-md-left">
        <div class="copyright">
          &copy; Copyright <strong><span>ArztSpot</span></strong>. All Rights Reserved.
        </div>
        <div class="credits">
          Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
        </div>
      </div>
      <div class="social-links text-center text-md-right pt-3 pt-md-0">
        <a href="#" class="twitter"><i class="bx bxl-twitter"></i></a>
        <a href="#" class="facebook"><i class="bx bxl-facebook"></i></a>
        <a href="#" class="instagram"><i class="bx bxl-instagram"></i></a>
        <a href="#" class="google-plus"><i class="bx bxl-skype"></i></a>
        <a href="#" class="linkedin"><i class="bx bxl-linkedin"></i></a>
      </div>
    </div>
        
      </footer>

    );
  }
}