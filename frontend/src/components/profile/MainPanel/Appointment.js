import React, {Fragment} from 'react';
import AppointmentItem from "./AppointmentItem";

const Appointment = ({appointments}) => {
  return (
    <Fragment>
      {appointments.map((appointment, i) => <AppointmentItem key={i} appointment={appointment}/>)}
    </Fragment>

  );
};

export default Appointment;
