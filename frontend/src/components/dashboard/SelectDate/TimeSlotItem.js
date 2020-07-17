import React, {Fragment, useContext, useEffect} from "react";
import DashboardContext from "../../../context/Dashboard/dashboardContext";
import moment from "moment";

const TimeSlotItem = ({ slot }) => {
  const dashboardContext = useContext(DashboardContext);
  const { setAppointment, selectedDate } = dashboardContext;
  const {time, appointmentTaken} = slot;
  const onClick = (e) => {
    setAppointment({ ...selectedDate, timeSlot: time });
  };
  return (
    <Fragment>
      <a
        type="submit"
        className={`dropdown-item ${appointmentTaken && "disabled"}` }
        onClick={onClick}
        name="timeSlot"
      >
        {time}
      </a>
    </Fragment>
  );
};

export default TimeSlotItem;
