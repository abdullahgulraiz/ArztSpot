import React, { useReducer } from "react";
import axios from "axios";
import DashboardContext from "./dashboardContext";
import dashboardReducer from "./dashboardReducer";
import createTimeSlots from "../../utils/appointmentUtils";
import moment from "moment";
const DashboardState = (props) => {
  const initialState = {
    doctor: {
      specialization: "",
      hospital: {},
    },
    selectedDate: {
      day: null,
      timeSlot: "Choose an appointment",
    },
    // slots available within a certain date
    slots: [
      {
        time: null,
        appointmentTaken: false,
      },
    ],
    reviews: {},
    appointments: {},
    error: null,
  };
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  const setCurrentDoctor = (doctor) => {
    dispatch({ type: "SET_CURRENT_DOCTOR", payload: doctor });
  };

  // get doctor by id
  const getDoctorById = async (doctorId) => {
    const url = encodeURI("/api/v1/doctors" + "/" + doctorId);
    try {
      const res = await axios.get(url);
      dispatch({ type: "SET_CURRENT_DOCTOR", payload: res.data.data });
    } catch (e) {
      dispatch({ type: "DOCTOR_ERROR_404", payload: e });
    }
  };
  // Clear State of selected date
  const clearSelectedDate = () => {
    dispatch({ type: "CLEAR_SELECTED_DATE" });
  };
  // Clear State of slots
  const clearSlots = () => {
    dispatch({ type: "CLEAR_SLOTS" });
  };

  const setPossibleAppointments = async (day, doctor) => {
    // We get the day of the consultation and for that day we check if appointment
    // is booked or not for all possible slots
    const dayString = day.format("DD-MM-YYY");
    // Create possible slots -> From the time the user is visiting the page onwards
    let slots = [];
    let startTime;
    let finishTime;
    const url =
      "/api/v1/appointments/" + doctor.hospital._id + "/" + doctor._id;
    const res = await axios.get(url);
    const slotsArr = createTimeSlots(day);
    slotsArr.map((slot) => {
      let newSlot = { time: null, appointmentTaken: false };
      // momentAppointment -> Day selected and hour for all possible appointments in that day
      startTime = moment(
        dayString + " " + slot.format("kk:mm"),
        "DD-MM-YYY kk:mm"
      );
      finishTime = startTime.clone().add("30", "minutes");
      res.data.appointment.map((existingAppointment) => {
        // get milliseconds from existing appointments
        // Date in JS returns a string by default, we must create a new Date.
        const existingAppointmentStart = new Date(
          existingAppointment.startTime
        ).getTime();
        const existingAppointmentFinish = new Date(
          existingAppointment.finishTime
        ).getTime();

        if (
          existingAppointmentStart === startTime.toDate().getTime() &&
          existingAppointmentFinish === finishTime.toDate().getTime()
        ) {
          newSlot = { ...newSlot, appointmentTaken: true };
        } else {
          newSlot = { ...newSlot, appointmentTaken: false };
        }
      });
      newSlot = { ...newSlot, time: slot.format("kk:mm") };
      slots.push(newSlot);
    });
    dispatch({ type: "SET_POSSIBLE_SLOTS", payload: slots });
  };
  // change appointment once is selected
  const setAppointment = (appointment) => {
    dispatch({ type: "SET_SELECTED_APPOINTMENT", payload: appointment });
  };

  return (
    <DashboardContext.Provider
      value={{
        doctor: state.doctor,
        reviews: state.reviews,
        appointments: state.appointments,
        selectedDate: state.selectedDate,
        slots: state.slots,
        error: state.error,
        clearSelectedDate,
        clearSlots,
        setCurrentDoctor,
        getDoctorById,
        setAppointment,
        setPossibleAppointments,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};
export default DashboardState;
