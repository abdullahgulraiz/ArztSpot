import React, { Fragment, useContext, useEffect } from "react";
import DashboardContext from "../../context/Dashboard/dashboardContext";
import createTimeSlots from "../../utils/appointmentUtils";
import TimeSlotItem from "./TimeSlotItem";
const TimeSlot = () => {
  const dashboardContext = useContext(DashboardContext);
  const { setAppointment, selectedDate } = dashboardContext;
  const slots = createTimeSlots();
  const { timeSlot } = selectedDate;
  return (
    <Fragment>
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-primary dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {timeSlot}
        </button>
        <div
          className="dropdown-menu"
          style={{
            height: "auto",
            "max-height": "200px",
            "overflow-x": "hidden",
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
