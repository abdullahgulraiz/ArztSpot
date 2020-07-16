import React, {Fragment, useContext} from "react";
import Alert from "../Alert";
import CalendarItem from "./CalendarItem";
import TimeSlot from "./TimeSlot";
import DashboardContext from "../../../context/Dashboard/dashboardContext";

const SelectDateMain = ({ doctor, hospital }) => {
  const dashboardContext = useContext(DashboardContext);
  const { selectedDate, alert } = dashboardContext;
  return (
    <Fragment>
        {alert && <Alert msg="Appointment already exists" />}
        <br />
        <CalendarItem />
        <br />
        <div className="">
          {selectedDate.day && (
            <TimeSlot
              day={selectedDate.day}
              timeSlot={selectedDate.timeSlot}
              doctor={doctor}
              hospital={hospital}
            />
          )}
          <br />
        </div>
    </Fragment>
  );
};

export default SelectDateMain;
