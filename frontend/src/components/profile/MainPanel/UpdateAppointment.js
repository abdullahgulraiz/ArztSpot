import React, { Fragment, useContext } from "react";
import ProfileContext from "../../../context/Profile/profileContext";
import { AuthContext } from "../../../auth/AuthState";

const UpdateAppointment = ({ appointment }) => {
  const profileContext = useContext(ProfileContext);
  const authContext = useContext(AuthContext);
  const { bearerToken } = authContext;
  const { updateAppointment } = profileContext;
  const onClick = (e) => {
    updateAppointment(bearerToken, appointment);
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
