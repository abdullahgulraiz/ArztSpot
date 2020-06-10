import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const DoctorButton = props => (
    <div className="dropdown">
        <Link className="get-started-btn scrollto dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {props.user.name}
        </Link>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <Link className="dropdown-item" to="#">Appointments</Link>
            <Link className="dropdown-item" to="#">Patients</Link>
            <Link className="dropdown-item" to="#">Questionnaires</Link>
            <Link className="dropdown-item" to="#">Prescriptions</Link>
            <Link className="dropdown-item" onClick={ () => {props.handleLogoutClick()} } >Logout</Link>
        </div>
    </div>
  )

  const PatientButton = props => (
    <div className="dropdown">
        <Link className="get-started-btn scrollto dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {props.user.name}
        </Link>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <Link className="dropdown-item" to="#">Appointments</Link>
            <Link className="dropdown-item" to="#">Prescriptions</Link>
            <Link className="dropdown-item" onClick={ () => {props.handleLogoutClick()} } >Logout</Link>
        </div>
    </div>
  )

  const LoginButton = props => (
    <Link to="/login" className="get-started-btn scrollto">Login/Signup</Link>
  )

export default class Navbar extends Component {

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
        let button;
        if (isLoggedIn) {
            const user = this.state.user;
            if (user.role === 'doctor') {
                button = <DoctorButton user={user} handleLogoutClick={this.handleLogoutClick} />;
            } else if (user.role === 'patient') {
                button = <PatientButton user={user} handleLogoutClick={this.handleLogoutClick} />;
            }
        } else {      
            button = <LoginButton onClick={this.handleLoginClick} />;    
        }

        return (
            
            <header id="header" className="fixed-top">
            <div className="container d-flex align-items-center">

                <h1 className="logo mr-auto"><Link to="/">ArztSpot</Link></h1>

                <nav className="nav-menu d-none d-lg-block">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/services">Service</Link></li>
                    <li><Link to="/faqs">FAQs</Link></li>
                    <li><Link to="/contact">Contact</Link></li>

                </ul>
                </nav>

                {button}

            </div>
            </header>

        );
  }
}