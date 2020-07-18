import React, { Fragment, useContext } from "react";
import ProfileContext from "../../../context/Profile/profileContext";
import { AuthContext } from "../../../context/auth/AuthState";

const DeleteAppointment = ({ appointment }) => {
  const profileContext = useContext(ProfileContext);
  const authContext = useContext(AuthContext);
  const { bearerToken } = authContext;
  const { deleteAppointment } = profileContext;
  const onClick = (e) => {
    deleteAppointment(bearerToken, appointment);
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn btn-block btn-outline-danger"
    >
      Delete
    </button>
  );
};

export default DeleteAppointment;
