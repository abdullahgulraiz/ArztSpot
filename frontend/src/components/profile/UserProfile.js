import React, { Fragment, useContext, useEffect } from "react";
import { AuthContext } from "../../auth/AuthState";
import ProfileContext from "../../context/Profile/profileContext";
import MainPanelPatient from "./MainPanel/MainPanelPatient";
import SidePanel from "./SidePanel";
import MainPanelDoctor from "./MainPanel/MainPanelDoctor";

const UserProfile = () => {
  useEffect(() => {
    // on component mount, get appointments
    if (user.role === "user") {
      getAppointments(user._id, bearerToken);
    }
  }, []);
  const profileContext = useContext(ProfileContext);
  const authContext = useContext(AuthContext);
  const { appointments, getAppointments } = profileContext;
  const { user, bearerToken } = authContext;

  return (
    <div className="container emp-profile">
        <div className="row">
          <div className="col-md-4">
            <SidePanel />
          </div>
          <div className="col-md-8">
            { user.role === "user" ? <MainPanelPatient appointments={appointments}/> : <MainPanelDoctor appointments={appointments}/>}
          </div>
        </div>
    </div>
  );
};

export default UserProfile;
