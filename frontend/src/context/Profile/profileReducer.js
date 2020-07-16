export default (state, action) => {
  switch (action.type) {
    case "SET_APPOINTMENTS_FOR_USER":
      return {
        ...state,
        appointments: action.payload
      }
    default:
      return state;
  }
}