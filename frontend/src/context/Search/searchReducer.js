export default (state, action) => {
  switch (action.type) {
    case "GET_DOCTORS":
      return {
        ...state,
        doctors: action.payload.doctors,
        pagination: action.payload.pagination
      }
    case "SET_SEARCH":
      console.log(action.payload)
      return {
        ...state,
        search: action.payload
      }
    default:
      return state;
  }
}