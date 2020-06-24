import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../../auth/AuthState";
import routes from "../../routes";
import { reverse } from 'named-urls'

const DoctorActions = () => (
  <ul>
    <li><i className="bx bx-chevron-right"></i> <a href="#">Appointments</a></li>
    <li><i className="bx bx-chevron-right"></i> <a href="#">Patients</a></li>
    <li><i className="bx bx-chevron-right"></i> <a href="#">Questionnaires</a></li>
    <li><i className="bx bx-chevron-right"></i> <Link to={reverse(routes.doctor.prescriptions.search)}>Prescriptions</Link></li>

  </ul>
)

const PatientActions = () => (
  <ul>
    <li><i className="bx bx-chevron-right"></i> <a href="#">Appointments</a></li>
    <li><i className="bx bx-chevron-right"></i> <a href="#">Prescriptions</a></li>
  </ul>
)

const GuestActions = () => (
  <ul>
    <li><i className="bx bx-chevron-right"></i> <a href="#">Log in / Sign up</a></li>
    <li><i className="bx bx-chevron-right"></i> <a href="#">Search for a doctor</a></li>
  </ul>
)

export const Footer = () => {
    const { is_authenticated, user, logoutUser } = useContext(AuthContext);
    let actions;
    if (is_authenticated) {
        if (user.role === 'doctor') {
            actions = <DoctorActions />;
        } else if (user.role === 'patient') {
            actions = <PatientActions />;
        }
    } else {
        actions = <GuestActions />;
    }

    return (

        <footer id="footer">

            <div className="footer-top">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-3 col-md-6 footer-contact">
                            <h3>ArztSpot</h3>
                            <p>
                                Boltzmannstraße 3 <br />
                                Garching bei München 85748<br />
                                Germany <br /><br />
                                <strong>Phone:</strong> +49 5589 55488 55<br />
                                <strong>Email:</strong> support@arztspot.de<br />
                            </p>
                        </div>

                        <div className="col-lg-2 col-md-6 footer-links">
                            <h4>Useful Links</h4>
                            <ul>
                                <li><i className="bx bx-chevron-right"></i> <Link to={routes.faqs}>FAQs</Link></li>
                                <li><i className="bx bx-chevron-right"></i> <a href="#">Terms of service</a></li>
                                <li><i className="bx bx-chevron-right"></i> <a href="#">Privacy policy</a></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 footer-links">
                            <h4>Actions</h4>
                            {actions}
                        </div>

                        <div className="col-lg-4 col-md-6 footer-newsletter">
                            <h4>Join Our Newsletter</h4>
                            <p>Stay updated with latest insights on health, crafted by professionals and endorsed by doctors!</p>
                            <form action="" method="post">
                                <input type="email" name="email" /><input type="submit" value="Subscribe" />
                            </form>
                        </div>

                    </div>
                </div>
            </div>

            <div className="container d-md-flex py-4">

                <div className="mr-md-auto text-center text-md-left">
                    <div className="copyright">
                        &copy; Copyright <strong><span>ArztSpot</span></strong>. All Rights Reserved.
                    </div>
                    <div className="credits">
                        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                    </div>
                </div>
                <div className="social-links text-center text-md-right pt-3 pt-md-0">
                    <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
                    <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
                    <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
                    <a href="#" className="google-plus"><i className="bx bxl-skype"></i></a>
                    <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
                </div>
            </div>

        </footer>

    );
}