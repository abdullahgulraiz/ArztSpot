import React, { useReducer } from "react";
import axios from "axios";
import ProfileContext from "./profileContext";
import profileReducer from "./profileReducer";
import moment from "moment";


const ProfileState = (props) => {
  const initialState = {
    appointments: []
  };

  const [state, dispatch] = useReducer(profileReducer, initialState);

  // get appointments for user
  const getAppointments = async (userId, bearerToken) => {
    const url = "/api/v1/appointments"
    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    try {
      let res = await axios.get(url, config)
      // convert from string to moment for better handling in frontend
      res.data.data.map((appointment) => {
          appointment.startTime = moment(new Date(appointment.startTime).getTime())
      })
      res.data.data.map((appointment) => {
        appointment.finishTime = moment(new Date(appointment.finishTime).getTime())
      })
      dispatch({type: "SET_APPOINTMENTS_FOR_USER", payload: res.data.data})
    } catch (e) {
      console.log(e)
    }
  }
  // update appointments
  const updateAppointment = (userId, appointment) => {}
  // delete appointments
  const deleteAppointment = (userId, appointment) => {}




  return (
    <ProfileContext.Provider
      value={{
        appointments: state.appointments,
        getAppointments,
        updateAppointment,
        deleteAppointment
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};
export default ProfileState;