import React, { Fragment, useContext } from "react";
import ProfileContext from "../../../context/Profile/profileContext";
import { AuthContext } from "../../../auth/AuthState";
import DashboardContext from "../../../context/Dashboard/dashboardContext";

const UpdateAppointment = ({ appointment }) => {
  const profileContext = useContext(ProfileContext);
  const authContext = useContext(AuthContext);
  const dashboardContext = useContext(DashboardContext);
  const { selectedDate } = dashboardContext;
  const { bearerToken } = authContext;
  const { setUpdating, updating, updateAppointment, setAlert } = profileContext;
  const onClick = (e) => {
    // set current doctor we are updating the appointment
    // so that we can get his/her timeslots
    // setAppointment({day: appointment.startTime, timeSlot: appointment.startTime.format("kk:mm")})
    setUpdating(appointment._id);
    if (
      updating === appointment._id &&
      selectedDate.day !== null &&
      selectedDate.timeSlot !== null
    ) {
      updateAppointment(bearerToken, appointment._id, selectedDate);
    }
    if (
      updating === appointment._id &&
      (selectedDate.day === null || selectedDate.timeSlot === null)
    ) {
      setAlert(true, "Please select a date");
    }
  };
  const onClickCancel = (e) => {
    setUpdating("");
  };
  return (
    <Fragment>
      <button
        type="button"
        onClick={onClick}
        className="btn btn-block btn-outline-info mb-2"
      >
        Update
      </button>
      {updating === appointment._id && (
        <button
          type="button"
          onClick={onClickCancel}
          className="btn btn-block btn-outline-secondary"
        >
          Cancel
        </button>
      )}
    </Fragment>
  );
};

export default UpdateAppointment;
