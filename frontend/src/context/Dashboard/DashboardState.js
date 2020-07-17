import React, { useReducer } from "react";
import axios from "axios";
import DashboardContext from "./dashboardContext";
import dashboardReducer from "./dashboardReducer";
import createTimeSlots from "../../utils/appointmentUtils";
import moment from "moment";
import createStartAndFinishTime from "../../utils/createStartAndFinishTime";
const DashboardState = (props) => {
  const initialState = {
    doctor: {
      specialization: "",
      hospital: {},
    },
    selectedDate: {
      day: null,
      timeSlot: null,
    },
    // slots available within a certain date
    slots: [
      {
        time: null,
        appointmentTaken: false,
      },
    ],
    questions: [],
    appointment: {
      userId: "",
      doctorId: "",
      hospitalId: "",
      startTime: "",
      finishTime: "",
      symptoms: [],
    },
    appointmentCreated: false,
    error: null,
    alert: null,
    alertMsg: "",
  };
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  const setCurrentDoctor = (doctor, bearerToken) => {
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

  // Set Selected Date
  const setSelectedDate = (selectedDate) => {
    dispatch({ type: "SET_SELECTED_DATE", payload: selectedDate });
  };

  // Clear State of selected date
  const clearSelectedDate = () => {
    dispatch({ type: "CLEAR_SELECTED_DATE" });
  };
  // Clear State of slots
  const clearSlots = () => {
    dispatch({ type: "CLEAR_SLOTS" });
  };

  const setPossibleAppointments = async (day, doctor, hospital) => {
    // We get the day of the consultation and for that day we check if appointment
    // is booked or not for all possible slots
    const dayString = day.format("DD-MM-YYY");
    // Create possible slots -> From the time the user is visiting the page onwards
    let slots = [];
    let startTime;
    let finishTime;
    const url = "/api/v1/appointments/" + hospital._id + "/" + doctor._id;
    // TODO ADD TRY/CATCH
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
  const setAppointmentCreated = (appointmentCreated) => {
    dispatch({ type: "SET_APPOINTMENT_CREATED", payload: appointmentCreated });
  };
  const setAlert = (alert, msg) => {
    dispatch({ type: "SET_ALERT", payload: { alert: alert, alertMsg: msg } });
    setTimeout(
      () =>
        dispatch({
          type: "SET_ALERT",
          payload: { alert: false, alertMsg: "" },
        }),
      5000
    );
  };
  // book appointment
  const createAppointment = async (doctor, user, selectedDate, bearerToken) => {
    const { startTime, finishTime } = createStartAndFinishTime(
      selectedDate.day,
      selectedDate.timeSlot
    );
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    const reqBody = {
      userId: user._id,
      hospitalId: doctor.hospital._id,
      doctorId: doctor._id,
      startTime: startTime.toDate(),
      finishTime: finishTime.toDate(),
      symptoms: [],
    };
    const url = "/api/v1/appointments";
    try {
      await axios.post(url, reqBody, config);
      setAppointmentCreated(true);
    } catch (e) {
      setAlert(
        true,
        "It seems this appointment has already been taken. Please reload the page"
      );
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        doctor: state.doctor,
        reviews: state.reviews,
        selectedDate: state.selectedDate,
        appointment: state.appointment,
        appointmentCreated: state.appointmentCreated,
        slots: state.slots,
        error: state.error,
        alert: state.alert,
        alertMsg: state.alertMsg,
        clearSelectedDate,
        clearSlots,
        setCurrentDoctor,
        getDoctorById,
        setAppointment,
        setPossibleAppointments,
        setAppointmentCreated,
        createAppointment,
        setAlert,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};
export default DashboardState;
