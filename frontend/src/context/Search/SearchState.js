import React, { useReducer } from "react";
import axios from "axios";
import SearchContext from "./searchContext";
import searchReducer from "./searchReducer";
import languages from "../../data/languages";

const SearchState = (props) => {
  const initialState = {
    search: {
      type: "doctor",
      query: "",
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
        hospital: {}
      }
    ],
    pagination: {
      page: 1,
      count: 0,
      limit: 5,
    }
  };

  const [state, dispatch] = useReducer(searchReducer, initialState);

  // Set Search Components
  const setSearch = (search) => {
    dispatch({ type: "SET_SEARCH", payload: search });
  };

  // Doctor Search
  const doctorSearch = async (search, page) => {
    let queryStr = "?";
    const {
      query,
      street,
      country,
      zipcode,
      distance,
      languages,
      specialization,
    } = search;
    if (street !== "" && country !== "" && zipcode !== "") {
      queryStr += `address=${street},${country}&zipcode=${zipcode}&distance=${distance}&`;
    }
    // to search for multiple fields we need to format the string such that
    // languages[in]=french&languages[in]=spanish
    // so we get {'languages': '$in': ['spanish', 'french']
    if (languages.length > 1) {
      languages.map(language => {
        queryStr += `languages[in]=${language.toLowerCase()}&`;
      })
    } else if (languages.length === 1) {
      queryStr += `languages=${languages[0].toLowerCase()}&`;
    }
    if (specialization !== "") {
      queryStr += `specialization=${specialization.toLowerCase()}&`;
    }
    if (page !== 1) {
      queryStr += `page=${page}&`
    }
    const url = encodeURI("/api/v1/doctors" + queryStr);
    try {
      const res = await axios.get(url);
      const doctors = res.data.data.filter((doctor) => {
        const regex = new RegExp(`${query}`, "gi");
        const completeName = doctor.firstname + " " + doctor.lastname;
        return doctor.firstname.match(regex) || doctor.lastname.match(regex) || completeName.match(regex);
      })
      const pagination = {
        page: page,
        count: res.data.count,
        limit: res.data.pagination.next ? res.data.pagination.next.limit : res.data.pagination.prev.limit
      }
      dispatch({ type: "GET_DOCTORS", payload: {doctors, pagination} });
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
        pagination: state.pagination,
        setSearch,
        doctorSearch,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};
export default SearchState;
