import React, { Fragment, useContext } from "react";
import ProfileContext from "../../../context/Profile/profileContext";
import { AuthContext } from "../../../auth/AuthState";
import Appointment from "./Appointment";
import Info from "./Info";

const MainPanel = ({appointments}) => {
  const profileContext = useContext(ProfileContext);
  const authContext = useContext(AuthContext);
  const {
    updateAppointment,
    deleteAppointment,
  } = profileContext;
  const { user, bearerToken } = authContext;
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
          <li className="nav-item">
            <a
              className="nav-link"
              id="profile-tab"
              data-toggle="tab"
              href="#appointments"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Upcoming Appointments
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
            value={`${user.address_geojson.formattedAddress}`}
          />
          <Info label="Insurance Company" value={`${user.insurance_company}`} />
          <Info label="Insurance Number" value={`${user.insurance_number}`} />
          <Info label="Phone Number" value={`${user.phone}`} />
        </div>
        <div
          className="tab-pane fade"
          id="appointments"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          {/*{appointments.length >= 1 && <Appointment appointments={["hello", "my", "darling"]}/>}*/}
          <Appointment appointments={appointments}/>
        </div>
      </div>
    </Fragment>
  );
};

export default MainPanel;
