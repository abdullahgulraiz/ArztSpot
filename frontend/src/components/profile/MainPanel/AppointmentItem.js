import React, { Fragment, useContext } from "react";
import Info from "./Info";
import UpdateAppointment from "./UpdateAppointment";
import DeleteAppointment from "./DeleteAppointment";
import ProfileContext from "../../../context/Profile/profileContext";
import Alert from "../../dashboard/Alert";
import SelectDateMain from "../../dashboard/SelectDate/SelectDateMain";
import Loading from "../../general/loading.component";

const AppointmentItem = ({ appointment }) => {
  const profileContext = useContext(ProfileContext);
  const { updating, alert, alertMsg, isLoading } = profileContext;
  const { doctor, hospital } = appointment;
  if (isLoading === appointment._id) {
    return (
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="my-5 offset-5">
            <Loading />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="card-body">
            <h5 className="card-title">
              Appointment with Dr. {doctor.lastname}
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
            <Info
              label="Address"
              value={hospital.address_geojson.formattedAddress}
            />
            {alert && alertMsg !== "" && <Alert msg={alertMsg} />}
            {updating === appointment._id && (
              <SelectDateMain doctor={doctor} hospital={hospital} />
            )}
            <UpdateAppointment appointment={appointment} />
            {updating !== appointment._id && (
              <DeleteAppointment appointment={appointment} />
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default AppointmentItem;
