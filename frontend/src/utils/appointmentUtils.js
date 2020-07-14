import moment from "moment";
import "twix";
const iterateThroughSlot = (start, end, slots) => {
  const iterator = start.twix(end).iterate(30, "minutes");
  do {
    slots.push(iterator.next());
  } while (iterator.hasNext());
  // Remove the last timeslot (that is not bookable)
  return slots.slice(0, -1);
}

const createTimeSlots = (day) => {
  const now = moment();
  let start;
  const diff = now - now.clone().startOf("hour");
  // if a person wants to book an appointment for the same day
  // only the future dates should shown up
  console.log(day.isSame(now, 'day'))
  if (day.isSame(now, 'day')) {
    // if current time is 9:24 -> start is 9:30
    // if current time is 9:34 -> start is 10:00
    start =
      diff <= 30 * 1000 * 60
        ? moment().startOf("hour").add(30, "minutes")
        : moment().startOf("hour").add(1, "hour");
  } else {
    // not the same date, we can show the full options
    // set the start to before the clinic opens
    start = moment(
      moment().format("DD-MM-YYY") + " " + "8:00",
      "DD-MM-YYYY kk:mm"
    );
  }

  // the day we are in at 13:00 lunch break till 14:00
  const startBreak = moment(
    start.clone().format("DD-MM-YYY") + " " + "13:00",
    "DD-MM-YYYY kk:mm"
  );
  const finishBreak = moment(
    start.clone().format("DD-MM-YYY") + " " + "14:00",
    "DD-MM-YYYY kk:mm"
  );
  // Clinic close
  const todayAt6 = moment(
    start.clone().format("DD-MM-YYY") + " " + "18:00",
    "DD-MM-YYYY kk:mm"
  );
  let slots = [];
  // clinic is closed for today
  if (todayAt6 - start <= 0) {
    return slots;
  }
  // before lunchbreak
  if (start <= startBreak) {
    slots = iterateThroughSlot(start, startBreak, slots)
  }
  if(start < finishBreak) {
    slots = iterateThroughSlot(finishBreak, todayAt6, slots)
  } else {
    slots = iterateThroughSlot(start, todayAt6, slots)
  }
  // after break starts -> only return from finish break on


  return slots;
};
export default createTimeSlots;