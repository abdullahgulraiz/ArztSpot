import React, {Fragment, useContext, useEffect} from "react";
import Alert from "../Alert";
import CalendarItem from "./CalendarItem";
import TimeSlot from "./TimeSlot";
import DashboardContext from "../../../context/Dashboard/dashboardContext";

const SelectDateMain = ({ doctor, hospital }) => {
  const dashboardContext = useContext(DashboardContext);
  const { selectedDate, alert, alertMsg } = dashboardContext;
  return (
    <Fragment>
        {(alert && alertMsg !== "") && <Alert msg={alertMsg} />}
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
