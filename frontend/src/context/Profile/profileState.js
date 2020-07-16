import React, { useReducer } from "react";
import axios from "axios";
import ProfileContext from "./profileContext";
import profileReducer from "./profileReducer";
import moment from "moment";

const ProfileState = (props) => {
  const initialState = {
    appointments: [],
    updating: "",
    error: false,
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
      dispatch({ type: "SET_APPOINTMENTS_FOR_USER", payload: res.data.data });
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
  // update appointments
  const updateAppointment = (bearerToken, appointment) => {
    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
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
        getAppointments,
        updateAppointment,
        deleteAppointment,
        setUpdating
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};
export default ProfileState;
