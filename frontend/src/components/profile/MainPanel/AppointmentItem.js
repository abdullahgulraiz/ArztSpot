import React from 'react';
import moment from 'moment'

const AppointmentItem = ({appointment}) => {
  return (
    <div className="card mb-3">
      <div className="row no-gutters">
          <div className="card-body">
            <h5 className="card-title">Appointment with ....</h5>
            <p className="card-text">{appointment.startTime.format("dddd kk:mm")} till {appointment.finishTime.format("kk:mm")}</p>
          </div>
        </div>
    </div>
  );
};

export default AppointmentItem;
