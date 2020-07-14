import React, {Fragment, useContext} from 'react';
import DashboardContext from "../../context/Dashboard/dashboardContext";
import moment from "moment";

const TimeSlotItem = ({slot}) => {
  const dashboardContext = useContext(DashboardContext);
  const { setAppointment, selectedDate } = dashboardContext;
  const onClick = (e) => {
    setAppointment({ ...selectedDate, [e.target.name]: e.target.value });
  };
  return (
    <Fragment>
      <input
        type="submit"
        className="dropdown-item"
        onClick={onClick}
        name="timeSlot"
        value={slot.format("kk:mm")}
      />
    </Fragment>
  );
};

export default TimeSlotItem;
