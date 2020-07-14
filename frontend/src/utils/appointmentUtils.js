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
export default createTimeSlots;