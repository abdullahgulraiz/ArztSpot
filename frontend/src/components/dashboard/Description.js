import React, { Fragment, useContext, useEffect } from "react";
import DashboardContext from "../../context/Dashboard/dashboardContext";
import { Link, useLocation } from "react-router-dom";
const Description = () => {
  const dashboardContext = useContext(DashboardContext);
  const { doctor } = dashboardContext;
  const {
    firstname,
    lastname,
    specialization,
    languages,
    experience,
    email,
    phone,
    hospital,
  } = doctor;

  return (
    <Fragment>
      <div className="row">
        <div className="col-4">
          <img
            src={require("../../default.png")}
            className="rounded-circle"
            style={{ width: "100px" }}
            alt="..."
          />
        </div>
        <div className="col-8">
            <h3 className="font-weight-bold">{firstname + " " + lastname}</h3>
            <h5>
              {specialization.charAt(0).toUpperCase() + specialization.slice(1)}
            </h5>
        </div>
      </div>

      <br />
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className="nav-link active text-success"
            id="home-tab"
            data-toggle="tab"
            href="#experience"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            Experience
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className="nav-link text-success"
            id="profile-tab"
            data-toggle="tab"
            href="#contact"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Contact
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className="nav-link text-success"
            id="contact-tab"
            data-toggle="tab"
            href="#prices"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
          >
            Prices
          </a>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="experience"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <br />
          <p className={"text-justify"}>{experience}</p>
        </div>
        <div
          className="tab-pane fade"
          id="contact"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <br />
          {email && (
            <p>
              <strong>Email: </strong>
              {email}
            </p>
          )}
          {phone && (
            <p>
              <strong>Phone:</strong>
              {phone}
            </p>
          )}
          {hospital.address_geojson && (
            <p>
              <strong>Address: </strong>
              {hospital.address_geojson.formattedAddress}
            </p>
          )}
        </div>
        <div
          className="tab-pane fade"
          id="prices"
          role="tabpanel"
          aria-labelledby="contact-tab"
        ></div>
      </div>
    </Fragment>
  );
};

export default Description;
