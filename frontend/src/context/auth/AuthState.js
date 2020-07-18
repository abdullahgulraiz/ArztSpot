import React, { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import axios from "axios";

// Initial state
const initialState = {
  user: {},
  bearerToken: undefined,
  infoToUpdate: {
    firstname: "",
    lastname: "",
    email: "",
    insurance_company: "",
    insurance_number: "",
  },
  privatePractice: false,
  customErrors: {
    errorLanguages: false,
    errorSpecialization: false,
  },
  userToCreate: {
    zipcode: "",
    zipcodeHospital: "",
    address: "",
    city: "",
    country: "",
    countryHospital: "",
    cityHospital: "",
    addressHospital: "",
    phoneHospital: "",
    birthday: "",
    languages: [],
    specialization: "",
    insurance_company: "TK",
    insurance_number: "",
    experience: "",
    phone: "",
    role: null,
  },
};

// Create context
export const AuthContext = createContext(initialState);

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Actions
  function setBearerToken(token) {
    dispatch({
      type: "SET_BEARER_TOKEN",
      payload: token,
    });
  }

  function setUser(user) {
    dispatch({
      type: "SET_USER",
      payload: user,
    });
  }
  // User to create in register
  const setUserToCreate = (userToCreate) => {
    dispatch({ type: "SET_USER_TO_CREATE", payload: userToCreate });
  };
  // Set the type of user to register to show one
  // form or the other
  const setPrivatePractice = (isPrivatePractice) => {
    dispatch({ type: "SET_USER_PRACTICE", payload: isPrivatePractice });
  };
  const setUpdateInfo = (infoToUpdate) => {
    dispatch({
      type: "SET_UPDATE_INFO",
      payload: infoToUpdate,
    });
  };
  const setIsEditing = (isEditing) => {
    dispatch({ type: "SET_IS_EDITING", payload: isEditing });
  };
  const updateUser = async (bearerToken, infoToUpdate) => {
    const url = "/api/v1/auth/details";
    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    const toUpdate = {
      firstname: infoToUpdate.firstname,
      lastname: infoToUpdate.lastname,
      email: infoToUpdate.email,
      experience: infoToUpdate.experience,
    };
    try {
      const res = await axios.put(url, toUpdate, config);
      setUser(res.data.data);
      setIsEditing(false);
    } catch (e) {
      console.log(e.response);
    }
  };
  // Typehead component need
  // custom validation
  const setCustomErrors = (error) => {
    dispatch({ type: "SET_CUSTOM_ERROR", payload: error });
  };
  const clearCustomError = () => {
    dispatch({
      type: "CLEAR_CUSTOM_ERROR",
      payload: {
        errorLanguages: false,
        errorSpecialization: false,
      },
    });
  };

  function logoutUser() {
    dispatch({
      type: "LOGOUT_USER",
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        bearerToken: state.bearerToken,
        infoToUpdate: state.infoToUpdate,
        isEditing: state.isEditing,
        userToCreate: state.userToCreate,
        privatePractice: state.privatePractice,
        customErrors: state.customErrors,
        setCustomErrors,
        setUserToCreate,
        setUpdateInfo,
        setIsEditing,
        clearCustomError,
        setPrivatePractice,
        setBearerToken,
        setUser,
        logoutUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
