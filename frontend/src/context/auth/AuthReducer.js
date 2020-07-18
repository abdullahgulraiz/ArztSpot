import Cookies from "js-cookie";

export default (state, action) => {
  switch (action.type) {
    case "SET_BEARER_TOKEN":
      return {
        ...state,
        bearerToken: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_UPDATE_INFO": {
      return {
        ...state,
        infoToUpdate: action.payload,
      };
    }
    case "SET_IS_EDITING": {
      return {
        ...state,
        isEditing: action.payload,
      };
    }
    case "SET_USER_TO_CREATE": {
      return {
        ...state,
        userToCreate: action.payload,
      };
    }
    case "SET_USER_PRACTICE": {
      return {
        ...state,
        privatePractice: action.payload,
      };
    }
    case "SET_CUSTOM_ERROR": {
      return {
        ...state,
        customErrors: action.payload,
      };
    }
    case "CLEAR_CUSTOM_ERROR": {
      return {
        ...state,
        customErrors: action.payload,
      };
    }
    case "LOGOUT_USER":
      Cookies.remove("bearer_token");
      return {
        ...state,
        user: {},
        bearerToken: undefined,
      };
    default:
      return state;
  }
};
