import React, { useReducer } from "react";
import axios from "axios";
import ProfileContext from "./profileContext";
import profileReducer from "./profileReducer";
import moment from "moment";
import createStartAndFinishTime from "../../utils/createStartAndFinishTime";

const ProfileState = (props) => {
  const initialState = {
    appointments: [],
    pagination: {
      page: 1,
      count: 0,
      limit: 5,
    },
    updating: "",
    isLoading: false,
    error: false,
    alert: false,
    alertMsg: "",
  };

  const [state, dispatch] = useReducer(profileReducer, initialState);
  // Set loading (when fetching data from backend)
  const setIsLoading = (isLoading)=> {
    dispatch({type: "SET_IS_LOADING", payload: isLoading})
  }
  // get appointments for user
  const getAppointments = async ( bearerToken, page) => {
    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    try {
      // show only future appointments and sorted by time
      let res = await axios.get(`/api/v1/appointments?startTime[gte]=${moment.now()}&sort=startTime&page=${page}`, config);
      // the following can happen if we delete the last
      // appointment of the page, we should show the previous page.
      if (res.data.data.length === 0 && page > 1) {
        res = await axios.get(`/api/v1/appointments?startTime[gte]=${moment.now()}&sort=startTime&page=${page-1}`, config);
      }
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
      const pagination = {
        page: page,
        count: res.data.count,
        limit: 5,
      };
      dispatch({
        type: "SET_APPOINTMENTS_FOR_USER",
        payload: {
          appointments: res.data.data,
          pagination,
        },
      });
    } catch (e) {
      console.log(e.response);
    }
    setIsLoading(false)
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
    setIsLoading(false)
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
      await getAppointments(bearerToken, state.pagination.page)
      // dispatch({ type: "DELETE_APPOINTMENT", payload: appointment._id });
    } catch (e) {
      console.log(e);
      // dispatch({type: ""})
    }
    setIsLoading(false)
  };

  return (
    <ProfileContext.Provider
      value={{
        appointments: state.appointments,
        updating: state.updating,
        alert: state.alert,
        alertMsg: state.alertMsg,
        pagination: state.pagination,
        isLoading: state.isLoading,
        setIsLoading,
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
