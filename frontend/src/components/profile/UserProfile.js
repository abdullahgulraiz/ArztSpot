import React, { Fragment, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth/AuthState";
import ProfileContext from "../../context/Profile/profileContext";
import MainPanelPatient from "./MainPanel/MainPanelPatient";
import SidePanel from "./SidePanel";
import Pagination from "../general/Pagination";

const UserProfile = () => {
  useEffect(() => {
    // on component mount, get appointments
    if (user.role === "user") {
      // page to go
      const page = 1
      getAppointments(bearerToken, page);
    }
  }, []);
  const profileContext = useContext(ProfileContext);
  const authContext = useContext(AuthContext);
  const { appointments, getAppointments, pagination } = profileContext;
  const { user, bearerToken } = authContext;

  return (
    <div className="container emp-profile">
        <div className="row">
          <div className="col-md-4">
            <SidePanel/>
          </div>
          <div className="col-md-8">
            <MainPanelPatient appointments={appointments}/>
          </div>
        </div>
    </div>
  );
};

export default UserProfile;
