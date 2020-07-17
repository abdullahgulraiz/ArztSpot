export default (state, action) => {
  switch (action.type) {
    case "SET_APPOINTMENTS_FOR_USER":
      return {
        ...state,
        appointments: action.payload.filter((appointment) =>
          appointment.startTime.isAfter()
        ),
      };
    case "SET_UPDATING": {
      return {
        ...state,
        updating: action.payload,
      };
    }
    case "UPDATE_APPOINTMENT":
      return {
        ...state,
        appointments: state.appointments.map((appointment) =>
          appointment._id === action.payload._id ? action.payload : appointment
        ),
      };
    case "DELETE_APPOINTMENT":
      return {
        ...state,
        appointments: state.appointments.filter(
          (appointment) => appointment._id !== action.payload
        ),
      };
    case "SET_ALERT":
      return {
        ...state,
        alert: action.payload.alert,
        alertMsg: action.payload.alertMsg
      }
    default:
      return state;
  }
};
