import React, { useReducer } from "react";
import axios from "axios";
import ProfileContext from "./profileContext";
import profileReducer from "./profileReducer";
import moment from "moment";
import createStartAndFinishTime from "../../utils/createStartAndFinishTime";

const ProfileState = (props) => {
  const initialState = {
    appointments: [],
    updating: "",
    error: false,
    alert: false,
    alertMsg: "",
  };

  const [state, dispatch] = useReducer(profileReducer, initialState);

  // get appointments for user
  const getAppointments = async (userId, bearerToken) => {
    const url = "/api/v1/appointments";
    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    try {
      let res = await axios.get(url, config);
      // convert from string to moment for better handling in frontend
      res.data.data.map((appointment) => {
        appointment.startTime = moment(
          new Date(appointment.startTime).getTime()
        );
      });
      res.data.data.map((appointment) => {
        appointment.finishTime = moment(
          new Date(appointment.finishTime).getTime()
        );
      });
      dispatch({
        type: "SET_APPOINTMENTS_FOR_USER",
        payload: res.data.data.sort((a, b) => {
          return moment(a.startTime).diff(b.startTime);
        }),
      });
    } catch (e) {
      console.log(e);
    }
  };
  // If we are updating we want to show
  // the calendar of the doctor so first we need to
  // set updating to the id of the appointment to update
  const setUpdating = (appointmentId) => {
    dispatch({ type: "SET_UPDATING", payload: appointmentId });
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
  // update appointments
  const updateAppointment = async (
    bearerToken,
    appointmentId,
    selectedDate
  ) => {
    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    const { startTime, finishTime } = createStartAndFinishTime(
      selectedDate.day,
      selectedDate.timeSlot
    );
    const reqBody = {
      startTime: startTime.toDate(),
      finishTime: finishTime.toDate(),
    };
    try {
      const res = await axios.put(
        `/api/v1/appointments/${appointmentId}`,
        reqBody,
        config
      );
      res.data.appointment.startTime = moment(
        new Date(res.data.appointment.startTime).getTime()
      );
      res.data.appointment.finishTime = moment(
        new Date(res.data.appointment.finishTime).getTime()
      );
      dispatch({ type: "UPDATE_APPOINTMENT", payload: res.data.appointment });
      setUpdating("");
    } catch (e) {
      setAlert(
        true,
        "It seems this appointment has already been taken. Please reload the page"
      );
    }
  };
  // delete appointments
  const deleteAppointment = async (bearerToken, appointment) => {
    const url = `/api/v1/appointments/${appointment._id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    try {
      await axios.delete(url, config);
      dispatch({ type: "DELETE_APPOINTMENT", payload: appointment._id });
    } catch (e) {
      console.log(e);
      // dispatch({type: ""})
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        appointments: state.appointments,
        updating: state.updating,
        alert: state.alert,
        alertMsg: state.alertMsg,
        getAppointments,
        updateAppointment,
        deleteAppointment,
        setUpdating,
        setAlert,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};
export default ProfileState;
