// Create Start and FinishTime in moment js format
// @params:
// day -> moment.js object (Day in which create the slots)
// hour -> string representing hour in 24-hour format (Ex: "8:00"). Hour of the day to create the slot.
import moment from "moment";

const createStartAndFinishTime = (day, startHour) => {
  const dayString = day.format("DD-MM-YYY");
  const startTime = moment(
    dayString + " " + startHour,
    "DD-MM-YYY kk:mm"
  );
  const finishTime = startTime.clone().add("30", "minutes");
  return {
    startTime: startTime,
    finishTime: finishTime,
  };
};

export default createStartAndFinishTime;
