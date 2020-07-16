import React from "react";
import Info from "./Info";
import UpdateAppointment from "./UpdateAppointment";
import DeleteAppointment from "./DeleteAppointment";

const AppointmentItem = ({ appointment }) => {
  const { doctor, hospital } = appointment;
  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="card-body">
          <h5 className="card-title">Appointment with Dr. {doctor.lastname}</h5>
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
          <Info
            label="Address"
            value={hospital.address_geojson.formattedAddress}
          />
          <UpdateAppointment appointment={appointment} />
          <DeleteAppointment appointment={appointment} />
        </div>
      </div>
    </div>
  );
};

export default AppointmentItem;
