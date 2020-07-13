export default (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_DOCTOR":
      return {
        ...state,
        doctor: action.payload,
      };
    case "DOCTOR_ERROR_404":
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
};
