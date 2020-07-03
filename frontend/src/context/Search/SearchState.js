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
      hasSearched: false,
      locationFormError: true
    },
    doctors: [
      {
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        specialization: "",
        avatar: "",
        languages: [],
      }
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
    // to search for multiple fields we need to format the string such that
    // languages[in]=french&languages[in]=spanish
    // so we get {'languages': '$in': ['spanish', 'french']
    if (languages.length > 1) {
      languages.map(language => {
        queryStr += `languages[in]=${language.toLowerCase()}&`;
      })
    } else if (languages.length === 1) {
      queryStr += `languages=${languages.toLowerCase()}&`;
    }
    if (specialization !== "") {
      queryStr += `specialization=${specialization.toLowerCase()}`;
    }
    const url = encodeURI("/api/v1/doctors" + queryStr);
    console.log(url)
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
