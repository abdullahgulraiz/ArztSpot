import React, { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import axios from "axios";

// Initial state
const initialState = {
  user: {},
  alert: null,
  alertMsg: "",
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
  hospitalToCreate: {
    nameHospital: "",
    zipcodeHospital: "",
    countryHospital: "",
    cityHospital: "",
    addressHospital: "",
    phoneHospital: "",
  },
  userToCreate: {
    zipcode: "",
    address: "",
    city: "",
    country: "",
    birthday: "",
    languages: [],
    specialization: "",
    insurance_company: "TK",
    insurance_number: "",
    experience: "",
    phone: "",
    role: "user",
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
  // Hospital to create in register doctor
  const setHospitalToCreate = (hospitalToCreate) => {
    dispatch({ type: "SET_HOSPITAL_TO_CREATE", payload: hospitalToCreate });
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
  // create patient
  const createPatient = async (user) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    // user to post
    const userToPost = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      phone: user.phone,
      address:
        user.address +
        ", " +
        user.city +
        ", " +
        user.zipcode +
        ", " +
        user.country,
      birthday: user.birthday,
      insurance_company: user.insurance_company,
      insurance_number: user.insurance_number,
      role: user.role,
    };
    try {
      const res = await axios.post("/api/v1/auth/register", userToPost, config);
      setUser(res.data.user);
      setBearerToken(res.data.token);
    } catch (e) {
      if (e.response.data.error.includes("Duplicate")) {
        setAlert(true, "Email is already taken");
      } else {
        setAlert(true, "Error please try again later");
      }
    }
  };
  // create doctor
  const createDoctor = async (doctor, hospitalToCreate, isHospital) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    // user to post
    const doctorToPost = {
      firstname: doctor.firstname,
      lastname: doctor.lastname,
      email: doctor.email,
      password: doctor.password,
      languages: doctor.languages,
      specialization: doctor.specialization,
      experience: doctor.experience,
      role: doctor.role,
    };
    try {
      const res = await axios.post(
        "/api/v1/auth/register",
        doctorToPost,
        config
      );
      setUser(res.data.user);
      setBearerToken(res.data.token);
      // Create hospital also if isHospital
      if (isHospital) {
        await createHospital(
          hospitalToCreate,
          res.data.token,
          res.data.user._id
        );
      }
      clearUserToCreate();
      clearHospitalToCreate();
    } catch (e) {
      if (e.response.data.error.includes("Duplicate")) {
        setAlert(true, "Email is already taken");
      } else {
        setAlert(true, "Error please try again later");
      }
    }
  };
  // clear userToCreate when finished
  const clearUserToCreate = () => {
    dispatch({ type: "CLEAR_USER_TO_CREATE" });
  };
  // some doctors create their practice straight away
  const createHospital = async (hospital, bearerToken, userId) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    let hospitalToPost = {
      name: hospital.nameHospital,
      address:
        hospital.addressHospital +
        ", " +
        hospital.cityHospital +
        ", " +
        hospital.zipcodeHospital +
        ", " +
        hospital.countryHospital,
      phone: hospital.phoneHospital,
      is_private_practice: true,
      owner: userId,
    };
    console.log(hospitalToPost);

    try {
      await axios.post("/api/v1/hospitals", hospitalToPost, config);
    } catch (e) {
      setAlert(
        true,
        "User created, but not clinic, go to your profile and try again"
      );
    }
  };
  const clearHospitalToCreate = () => {
    dispatch({ type: "CLEAR_HOSPITAL_TO_CREATE" });
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
      if (e.response.data.error.includes("Duplicate")) {
        setAlert(true, "Email is already taken");
      } else {
        setAlert(true, "Error please try again later");
      }
    }
  };
  // Typeahead component need
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
  const setAlert = (alert, msg) => {
    dispatch({ type: "SET_ALERT", payload: { alert: alert, alertMsg: msg } });
    setTimeout(
      () =>
        dispatch({
          type: "SET_ALERT",
          payload: { alert: false, alertMsg: "" },
        }),
      5000
    );
  };

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
        hospitalToCreate: state.hospitalToCreate,
        alert: state.alert,
        alertMsg: state.alertMsg,
        createPatient,
        createHospital,
        createDoctor,
        setHospitalToCreate,
        setCustomErrors,
        setUserToCreate,
        setUpdateInfo,
        setIsEditing,
        clearCustomError,
        setPrivatePractice,
        setAlert,
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
