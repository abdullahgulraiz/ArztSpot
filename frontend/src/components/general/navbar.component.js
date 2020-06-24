import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../routes.js';
import { reverse } from 'named-urls'
import { AuthContext } from '../../auth/AuthState';

const DoctorButton = props => (
    <div className="dropdown">
        <Link className="get-started-btn scrollto dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" to="#">
            {props.user.firstname}  {props.user.lastname}
        </Link>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <Link className="dropdown-item" to="#">Appointments</Link>
            <Link className="dropdown-item" to="#">Patients</Link>
            <Link className="dropdown-item" to="#">Questionnaires</Link>
            <Link className="dropdown-item" to={reverse(routes.doctor.prescriptions.search)}>Prescriptions</Link>
            <Link className="dropdown-item" onClick={ () => {props.handleLogoutClick()} } to="#" >Logout</Link>
        </div>
    </div>
  )

  const PatientButton = props => (
    <div className="dropdown">
        <Link className="get-started-btn scrollto dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {props.user.firstname}  {props.user.lastname}
        </Link>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <Link className="dropdown-item" to="#">Appointments</Link>
            <Link className="dropdown-item" to="#">Prescriptions</Link>
            <Link className="dropdown-item" onClick={ () => {props.handleLogoutClick()} } >Logout</Link>
        </div>
    </div>
  )

  const LoginButton = props => (
    <Link to={reverse(routes.auth.login)} className="get-started-btn scrollto">Login/Signup</Link>
  )

export const Navbar = () => {

    const { is_authenticated, user, logoutUser } = useContext(AuthContext);
    const handleLogout = () => {
        logoutUser();
        window.location.pathname = "/";
    }

    let button;
    if (is_authenticated) {
        if (user.role === 'doctor') {
            button = <DoctorButton user={user} handleLogoutClick={handleLogout} />;
        } else if (user.role === 'patient') {
            button = <PatientButton user={user} handleLogoutClick={handleLogout} />;
        }
    } else {
        button = <LoginButton />;
    }

    return (

        <header id="header" className="fixed-top">
            <div className="container d-flex align-items-center">

                <h1 className="logo mr-auto"><Link to="/">ArztSpot</Link></h1>

                <nav className="nav-menu d-none d-lg-block">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to={routes.about}>About</Link></li>
                        <li><Link to={routes.services}>Service</Link></li>
                        <li><Link to={routes.faqs}>FAQs</Link></li>
                        <li><Link to={routes.contact}>Contact</Link></li>
                    </ul>
                </nav>
                {button}
            </div>
        </header>

    );
}