import React, { Fragment, useContext, useEffect } from "react";
import DashboardContext from "../../context/Dashboard/dashboardContext";
import TimeSlotItem from "./TimeSlotItem";

const TimeSlot = () => {
  const dashboardContext = useContext(DashboardContext);
  const {
    selectedDate,
    setPossibleAppointments,
    slots,
    doctor,
  } = dashboardContext;
  const { timeSlot, day } = selectedDate;
  useEffect(() => {
    setPossibleAppointments(day, doctor);
    // update when day changes
    // eslint-disable-next-line
  }, [day]);
  return (
    <Fragment>
      <div className="btn-group btn-block">
        <button
          type="button"
          className="btn btn-primary dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {timeSlot ? day.format('MMM Do YY') + ': ' + timeSlot : day.format('MMM Do YY') + ': ' + 'Choose an Appointment'}
        </button>
        <div
          className="dropdown-menu btn-block"
          style={{
            height: "auto",
            maxHeight: "200px",
            overflowX: "hidden",
          }}
        >
          {slots.map((slot, i) => (
            <TimeSlotItem slot={slot} key={i} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default TimeSlot;
