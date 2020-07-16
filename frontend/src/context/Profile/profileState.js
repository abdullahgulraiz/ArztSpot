import React, { useReducer } from "react";
import axios from "axios";
import ProfileContext from "./profileContext";
import profileReducer from "./profileReducer";


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
      const res = await axios.get(url, config)
      dispatch({type: "SET_APPOINTMENTS_FOR_USER", payload: res.data.data})
    } catch (e) {
      console.log(e.response)
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