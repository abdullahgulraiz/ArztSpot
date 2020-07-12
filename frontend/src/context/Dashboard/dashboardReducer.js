export default (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_DOCTOR":
      return {
        ...state,
        doctor: action.payload,
      };
    default:
      return state;
  }
};
