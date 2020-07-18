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
      console.log(res.data)
      setUser(res.data.data);
      setIsEditing(false)
    } catch (e) {
      console.log(e.response);
    }
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
        setUpdateInfo,
        setIsEditing,
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
