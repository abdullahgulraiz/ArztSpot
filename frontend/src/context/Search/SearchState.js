import React, { useReducer } from "react";
import axios from "axios";
import SearchContext from "./searchContext";
import searchReducer from "./searchReducer";
import languages from "../../data/languages";

const SearchState = (props) => {
  const initialState = {
    search: {
      type: "doctor",
      languages: [],
      specialization: "",
      street: "",
      country: "",
      zipcode: "",
      distance: "15",
    },
    doctors: [
      {
        id: "5ee7b96a3431feba57523d03",
        firstname: "Mario",
        lastname: "Perez",
        email: "marioperez@hotmail.com",
        phone: "+(34) 555-555-555",
        specialization: "Dermatology",
        avatar: "backend/public/default.jpg",
        languages: ["japanese", "german"],
      },
      {
        id: "669b0d7ddcd112d072ed43a9",
        firstname: "Chad",
        lastname: "Clark",
        email: "chadclark@hotmail.com",
        phone: "+(34) 888-888-888",
        specialization: "Neurology",
        avatar: "backend/public/default.jpg",
        languages: ["english"],
      },
      {
        id: "816c8e3576d9fac927e1ab96",
        firstname: "Kevin",
        lastname: "Hart",
        email: "kevinhart@hotmail.com",
        phone: "+(34) 777-777-777",
        specialization: "traumatology",
        avatar: "backend/public/default.jpg",
        languages: ["spanish", "german"],
      },
    ],
  };

  const [state, dispatch] = useReducer(searchReducer, initialState);

  // Set Search Components
  const setSearch = (search) => {
    dispatch({ type: "SET_SEARCH", payload: search });
  };

  // Doctor Search
  const doctorSearch = async (search) => {
    let queryStr = "?";
    const {
      street,
      country,
      zipcode,
      distance,
      languages,
      specialization,
    } = search;
    // we first need to construct the query
    if (street !== "" && country !== "" && zipcode !== "") {
      queryStr += `street=${street},${country}&zipcode=${zipcode}&distance=${distance}&`;
    }
    if (languages.length > 0) {
      queryStr += `languages=or[${languages.join(",")}]&`;
    }
    if (specialization !== "") {
      queryStr += `specialization=${specialization}`;
    }
    const url = encodeURI("/api/v1/doctors" + queryStr);
    try {
      const res = await axios.get(url);
      console.log(res.data.data);
      dispatch({ type: "GET_DOCTORS", payload: res.data.data });
    } catch (e) {
      console.log(e)
    }
  };

  // Hospital Search

  return (
    <SearchContext.Provider
      value={{
        search: state.search,
        doctors: state.doctors,
        setSearch,
        doctorSearch,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};
export default SearchState;
