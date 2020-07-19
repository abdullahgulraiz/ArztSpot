import React  from "react";
import Info from "./Info";

const AppointmentItemDoctor = ({ appointment }) => {
  const { user } = appointment;
    return (
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="card-body">
            <h5 className="card-title">
              Appointment with {user.firstname} {user.lastname}
            </h5>
            <Info
              label="Date"
              value={appointment.startTime.format("dddd MMMM Do YYYY")}
            />
            <Info
              label="Time"
              value={`${appointment.startTime.format(
                "kk:mm"
              )} - ${appointment.finishTime.format("kk:mm")}`}
            />
          </div>
        </div>
      </div>
    );

};

export default AppointmentItemDoctor;
