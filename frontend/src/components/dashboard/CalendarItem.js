import React, { useContext } from "react";
import Calendar from "react-calendar";
import DashboardContext from "../../context/Dashboard/dashboardContext";
import moment from "moment";
const CalendarItem = () => {
  const dashboardContext = useContext(DashboardContext);
  const { setAppointment, selectedDate } = dashboardContext;
  const { day } = selectedDate;
  const onChange = (value) => {
    // Calendar component returns value not event like:
    // Thu Jul 16 2020 00:00:00 GMT+0200.
    // read it as moment date in milliseconds (x) format
    const momentDate = moment(value.getTime(), "x")
    setAppointment({ ...selectedDate, day: momentDate });
  };
  return (
    <div className="offset-1 offset-lg-3 offset-0 offset-lg-0">
      <Calendar className="rounded" onChange={onChange} minDate={new Date()} value={day ? day.toDate() : null} />
    </div>
  );
};

export default CalendarItem;
