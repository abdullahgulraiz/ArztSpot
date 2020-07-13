import React, { useContext } from "react";
import Calendar from "react-calendar";
import DashboardContext from "../../context/Dashboard/dashboardContext";
const CalendarItem = () => {
  const dashboardContext = useContext(DashboardContext);
  const { setAppointment, selectedDate } = dashboardContext;
  const onChange = (value) => {
    // Calendar component returns value not event
    setAppointment({ ...selectedDate, day: value });
  };
  return (
    <div className="offset-1 offset-lg-3 offset-0 offset-lg-0">
      <Calendar className="rounded" onChange={onChange} minDate={new Date()} value={selectedDate.day} />
    </div>
  );
};

export default CalendarItem;
