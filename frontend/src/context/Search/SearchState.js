import React, { useReducer } from "react";
import axios from "axios";
import SearchContext from "./searchContext";
import searchReducer from "./searchReducer";
import moment from "moment";

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
      resultsLoaded: false,
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
        hospital: {},
      },
    ],
    pagination: {
      page: 1,
      count: 0,
      limit: 5,
    },
  };

  const [state, dispatch] = useReducer(searchReducer, initialState);

  // Set Search Components
  const setSearch = (search) => {
    dispatch({ type: "SET_SEARCH", payload: search });
  };

  // Doctor Search
  const doctorSearch = async (search, page) => {
    // Show only doctors with consultation rooms
    let queryStr = "?hospital[exists]=true&";
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
      languages.map(
        (language) => (queryStr += `languages[in]=${language.toLowerCase()}&`)
      );
    } else if (languages.length === 1) {
      queryStr += `languages=${languages[0].toLowerCase()}&`;
    }
    if (specialization !== "") {
      queryStr += `specialization=${specialization.toLowerCase()}&`;
    }
    if (page !== 1) {
      queryStr += `page=${page}&`;
    }
    if (query) {
      // case insensitive search in lastname
      queryStr += `lastname[regex]=${query}&lastname[options]=i`
    }
    let url = "/api/v1/doctors" + queryStr;
    console.log(url)
    try {
      let res = await axios.get(encodeURI(url));
      // the following can happen if we search for the last doctor
      // of the page, we should show the first page.
      if (res.data.data.length === 0 && page > 1) {
        url = url.replace(`page=${page}`, `page=${1}`)
        res = await axios.get(url);
      }
      let doctors = res.data.data.map((doctor) => {
        const name = doctor.photo || "default.png"
        doctor.photo =`/uploads/${name}`
        return doctor
      })
      const pagination = {
        page: page,
        count: res.data.count,
        limit: 5,
      };
      dispatch({ type: "GET_DOCTORS", payload: { doctors, pagination } });
      setSearch({...search, resultsLoaded: true, hasSearched: true})
    } catch (e) {
      console.log(e);
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
