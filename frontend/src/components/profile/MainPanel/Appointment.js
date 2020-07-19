import React, { Fragment, useContext } from "react";
import AppointmentItem from "./AppointmentItem";
import ProfileContext from "../../../context/Profile/profileContext";
import Pagination from "../../general/Pagination";

const Appointment = ({ appointments, bearerToken }) => {
  const profileContext = useContext(ProfileContext);
  const { getAppointments, pagination } = profileContext;

  return (
    <Fragment>
      {appointments.map((appointment, i) => (
        <AppointmentItem key={i} appointment={appointment} />
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
