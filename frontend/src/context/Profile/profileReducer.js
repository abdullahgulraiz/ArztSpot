export default (state, action) => {
  switch (action.type) {
    case "SET_APPOINTMENTS_FOR_USER":
      return {
        ...state,
        appointments: action.payload.appointments,
        pagination: action.payload.pagination,
      };
    case "SET_UPDATING": {
      return {
        ...state,
        updating: action.payload,
      };
    }
    case "SET_IS_LOADING": {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case "SET_EDIT_INFO": {
      return {
        ...state,
        isEditing: action.payload,
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
      console.log(action.payload);
      return {
        ...state,
        alert: action.payload.alert,
        alertMsg: action.payload.alertMsg,
      };
    default:
      return state;
  }
};
