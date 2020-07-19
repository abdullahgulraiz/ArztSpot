import React, { Fragment, useContext } from "react";
import AppointmentItem from "./AppointmentItem";
import ProfileContext from "../../../context/Profile/profileContext";
import Pagination from "../../general/Pagination";
import AppointmentItemDoctor from "./AppointmentItemDoctor";
import { AuthContext } from "../../../context/auth/AuthState";

const Appointment = ({ appointments, bearerToken }) => {
  const profileContext = useContext(ProfileContext);
  const authContext = useContext(AuthContext);
  const { getAppointments, pagination } = profileContext;
  const { user } = authContext;
  return (
    <Fragment>
      {user.role === "user"
        ? appointments.map((appointment, i) => (
            <AppointmentItem key={i} appointment={appointment} />
          ))
        : appointments.map((appointment, i) => (
            <AppointmentItemDoctor key={i} appointment={appointment} />
          ))}
      {pagination.count !== 0 && (
        <Pagination
          searchFunc={getAppointments}
          pagination={pagination}
          searchParams={bearerToken}
        />
      )}
    </Fragment>
  );
};

export default Appointment;
