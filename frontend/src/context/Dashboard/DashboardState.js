import React, { useReducer } from "react";
import axios from "axios";
import DashboardContext from "./dashboardContext";
import dashboardReducer from "./dashboardReducer";

const DashboardState = (props) => {
  const initialState = {
    doctor: {},
    reviews: {},
    appointments: {},
  };
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  const setCurrentDoctor = (doctor) => {
    dispatch({ type: "SET_CURRENT_DOCTOR", payload: doctor });
  };
  return (
    <DashboardContext.Provider
      value={{
        doctor: state.doctor,
        reviews: state.reviews,
        appointments: state.appointments,
        setCurrentDoctor,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};
export default DashboardState;
