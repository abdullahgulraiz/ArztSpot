import React, { Fragment, useContext, useEffect } from "react";
import "twix";
import DashboardContext from "../../context/Dashboard/dashboardContext";
import moment from "moment";
const TimeSlot = () => {
  const dashboardContext = useContext(DashboardContext);
  const { setAppointment, selectedDate } = dashboardContext;
  const { timeSlot } = selectedDate;
  const onClick = (e) => {
    setAppointment({ ...selectedDate, [e.target.name]: e.target.value });
  };

  const iterateThroughSlot = (start, end, slots) => {
    const iterator = start.twix(end).iterate(30, "minutes");
    do {
      slots.push(iterator.next());
    } while (iterator.hasNext());
    // Remove the last timeslot (that is not bookable)
    return slots.slice(0, -1);
  }

  const createTimeSlots = () => {
    const now = moment();
    const diff = now - now.clone().startOf("hour");
    // if current time is 9:24 -> start is 9:30
    // if current time is 9:34 -> start is 10:00
    const start =
      diff <= 30 * 1000 * 60
        ? moment().startOf("hour").add(30, "minutes")
        : moment().startOf("hour").add(1, "hour");
    // today at 13:00 lunch break till 14:00
    const startBreak = moment(
      moment().format("DD-MM-YYY") + " " + "13:00",
      "DD-MM-YYYY kk:mm"
    );
    const finishBreak = moment(
      moment().format("DD-MM-YYY") + " " + "14:00",
      "DD-MM-YYYY kk:mm"
    );
    // Clinic close
    const todayAt6 = moment(
      moment().format("DD-MM-YYY") + " " + "18:00",
      "DD-MM-YYYY kk:mm"
    );
    let slots = [];
    console.log(start - todayAt6);
    // clinic is closed for today
    if (todayAt6 - start <= 0) {
      return slots;
    }
    // before lunchbreak
    if (start <= startBreak) {
      slots = iterateThroughSlot(start, startBreak, slots)
    }
    // after break starts -> only return from finish break on
    slots = iterateThroughSlot(finishBreak, todayAt6, slots)

    return slots;
  };
  const start = moment().format("kk:mm");
  const slots = createTimeSlots();
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
        <div className="dropdown-menu">
          <input
            type="submit"
            className="dropdown-item disabled"
            onClick={onClick}
            name="timeSlot"
            value="9:00"
          />
          <input
            type="submit"
            className="dropdown-item"
            onClick={onClick}
            name="timeSlot"
            value="9:30"
          />
          <input
            type="submit"
            className="dropdown-item"
            onClick={onClick}
            name="timeSlot"
            value="10:00"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default TimeSlot;
