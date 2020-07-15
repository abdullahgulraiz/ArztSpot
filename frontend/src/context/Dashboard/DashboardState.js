import React, { useReducer } from "react";
import axios from "axios";
import DashboardContext from "./dashboardContext";
import dashboardReducer from "./dashboardReducer";
import createTimeSlots from "../../utils/appointmentUtils";
import moment from "moment";
import createStartAndFinishTime from "../../utils/createStartAndFinishTime";
import {isEmptyObj} from "../../utils/isEmptyObj";
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
    appointment: {
      userId: "",
      doctorId: "",
      hospitalId: "",
      startTime: "",
      finishTime: "",
    },
    appointmentCreated: false,
    error: null,
    alert: null,
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
  const setAlert = (alert) => {
    dispatch({ type: "SET_ALERT", payload: alert });
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
    };
    console.log(reqBody)
    const url = "/api/v1/appointments";
    try {
      await axios.post(url, reqBody, config);
    } catch (e) {
      dispatch({ type: "SET_ALERT", payload: true });
      // make alert disappear after a couple seconds
      setTimeout(() => {
        dispatch({ type: "SET_ALERT", payload: false });
      }, 5000);
    }
  };
  // const createAppointment = async (doctor, user, selectedDate, bearerToken) => {
  //   // So if the user is not signed in we
  //   // want to maintain appointment in the context
  //   // so that when logging is finished we can book the appointment
  //   const { startTime, finishTime } = createStartAndFinishTime(
  //     selectedDate.day,
  //     selectedDate.timeSlot
  //   );
  //
  //   if (isEmptyObj(user) && !bearerToken) {
  //     dispatch({
  //       type: "CREATE_APPOINTMENT",
  //       payload: {
  //         hospitalId: doctor.hospital._id,
  //         doctorId: doctor._id,
  //         startTime: startTime.toDate(),
  //         finishTime: finishTime.toDate(),
  //       }
  //   }) } else if (!isEmptyObj(user) && bearerToken) {
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: `Bearer ${bearerToken}`,
  //       },
  //     };
  //     const reqBody = {
  //       userId: user._id,
  //       hospitalId: doctor.hospital._id,
  //       doctorId: doctor._id,
  //       startTime: startTime.toDate(),
  //       finishTime: finishTime.toDate(),
  //     };
  //     const url = "/api/v1/appointments";
  //     try {
  //       await axios.post(url, reqBody, config);
  //     } catch (e) {
  //       dispatch({ type: "SET_ALERT", payload: true });
  //       // make alert disappear after a couple seconds
  //       setTimeout(() => {
  //         dispatch({ type: "SET_ALERT", payload: false });
  //       }, 5000);
  //     }
  //   }
  // };
  // book appointment
  const bookAppointment = async (user, bearerToken, appointment) => {
    console.log(appointment)
    // const config = {
    //   headers: {
    //     "Content-type": "application/json",
    //     Authorization: `Bearer ${bearerToken}`,
    //   },
    // };
    // console.log("Appointment")
    // console.log(appointment);
    // const reqBody = {
    //   ...appointment,
    //   userId: user._id,
    // };
    // console.log(reqBody);
    // const url = "/api/v1/appointments";
    // try {
    //   const res = await axios.post(url, reqBody, config);
    //   console.log(res);
    //   console.log(reqBody);
    //   dispatch({
    //     type: "CLEAR_APPOINTMENT",
    //     payload: {
    //       userId: "",
    //       doctorId: "",
    //       hospitalId: "",
    //       startTime: "",
    //       finishTime: "",
    //     },
    //   });
    // } catch (e) {
    //   dispatch({ type: "SET_ALERT", payload: true });
    //   // make alert disappear after a couple seconds
    //   setTimeout(() => {
    //     dispatch({ type: "SET_ALERT", payload: false });
    //   }, 5000);
    // }
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
        clearSelectedDate,
        clearSlots,
        setCurrentDoctor,
        bookAppointment,
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
