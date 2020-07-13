import React, {Fragment, useContext, useEffect} from "react";
import DashboardContext from "../../context/Dashboard/dashboardContext";
import {
  useLocation
} from "react-router-dom";
const Description = () => {
  const dashboardContext = useContext(DashboardContext);
  const { doctor } = dashboardContext;
  const { experience } = doctor;

  return (
    <Fragment>
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
            href="#reviews"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Reviews
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
          <br/>
          <p className={"text-justify"}>{experience}</p>
        </div>
        <div
          className="tab-pane fade"
          id="reviews"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          Some Reviews
        </div>
        <div
          className="tab-pane fade"
          id="prices"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
        </div>
      </div>
    </Fragment>
  );
};

export default Description;
