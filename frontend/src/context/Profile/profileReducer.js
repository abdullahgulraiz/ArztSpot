export default (state, action) => {
  switch (action.type) {
    case "SET_APPOINTMENTS_FOR_USER":
      return {
        ...state,
        appointments: action.payload,
      };
    case "DELETE_APPOINTMENT":
      return {
        ...state,
        appointments: state.appointments.filter(
          (appointment) => appointment._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
