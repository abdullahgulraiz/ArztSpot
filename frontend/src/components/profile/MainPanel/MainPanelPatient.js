import React, { Fragment, useContext } from "react";
import { AuthContext } from "../../../context/auth/AuthState";
import Appointment from "./Appointment";
import EditPersonalInfo from "./EditPersonalInfo";
import PersonalInfo from "./PersonalInfo";

const MainPanelPatient = ({ appointments }) => {
  const authContext = useContext(AuthContext);
  const { user, isEditing, setIsEditing } = authContext;
  const onClick = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
  };
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
          {user.role === "user" && (
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
          )}
        </ul>
      </div>
      <div className="tab-content profile-tab" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="info"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          {isEditing ? (
            <EditPersonalInfo user={user} />
          ) : (
            <PersonalInfo user={user} />
          )}
          {isEditing ? (
            <button
              type="submit"
              onClick={onClick}
              className="btn btn-block btn-outline-danger"
            >
              Cancel
            </button>
          ) : (
            <button
              type="submit"
              onClick={onClick}
              className="btn btn-outline-secondary btn-block"
            >
              Edit info
            </button>
          )}
        </div>
        <div
          className="tab-pane fade"
          id="appointments"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          {user.role === "user" && <Appointment appointments={appointments} />}
        </div>
      </div>
    </Fragment>
  );
};

export default MainPanelPatient;
