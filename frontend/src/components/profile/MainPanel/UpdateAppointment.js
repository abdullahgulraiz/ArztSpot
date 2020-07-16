import React, { useContext } from "react";
import ProfileContext from "../../../context/Profile/profileContext";
import { AuthContext } from "../../../auth/AuthState";
import DashboardContext from "../../../context/Dashboard/dashboardContext";

const UpdateAppointment = ({ appointment }) => {
  const profileContext = useContext(ProfileContext);
  const authContext = useContext(AuthContext);
  const dashboardContext = useContext(DashboardContext);
  const { setAppointment } = dashboardContext;
  const { bearerToken } = authContext;
  const { setUpdating, updateAppointment } = profileContext;
  const onClick = (e) => {
    // set current doctor we are updating the appointment
    // so that we can get his/her timeslots
    setAppointment({day: appointment.startTime, timeSlot: appointment.startTime.format("kk:mm")})
    setUpdating(appointment._id);
    // updateAppointment(bearerToken, appointment);
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn btn-block btn-outline-info"
    >
      Update
    </button>
  );
};

export default UpdateAppointment;
