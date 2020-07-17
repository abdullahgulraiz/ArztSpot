import React, { Fragment, useContext } from "react";
import { AuthContext } from "../../../auth/AuthState";
import ProfileContext from "../../../context/Profile/profileContext";
import Info from "./Info";

const MainPanelDoctor = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const {hospital} = user
  return (
    <Fragment>
      <div className="profile-head">
        <h5>{user.firstname + " " + user.lastname}</h5>
        <h6>Your personal details</h6>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="home-tab"
              data-toggle="tab"
              href="#info"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Info
            </a>
          </li>
        </ul>
      </div>
      <div className="tab-content profile-tab" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="info"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <Info label="Name" value={`${user.firstname} ${user.lastname}`} />
          <Info label="Email" value={`${user.email}`} />
          <Info
            label="Address"
            value={`${hospital.address_geojson.formattedAddress}`}
          />
          {user.phone && <Info label="Phone Number" value={`${user.phone}`}/>}
        </div>
      </div>
    </Fragment>
  );
};

export default MainPanelDoctor;
