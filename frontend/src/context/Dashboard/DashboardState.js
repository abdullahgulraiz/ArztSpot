import React, { useReducer } from "react";
import axios from "axios";
import DashboardContext from "./dashboardContext";
import dashboardReducer from "./dashboardReducer";

const DashboardState = (props) => {
  const initialState = {
    doctor: {},
    reviews: {},
    appointments: {},
    error: null
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
      dispatch({type: "DOCTOR_ERROR_404", payload: e})
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        doctor: state.doctor,
        reviews: state.reviews,
        appointments: state.appointments,
        error: state.error,
        setCurrentDoctor,
        getDoctorById
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};
export default DashboardState;
