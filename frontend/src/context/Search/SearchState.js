import React, { useReducer } from "react";
import SearchContext from "./searchContext";
import searchReducer from "./searchReducer";

const SearchState = (props) => {
  const initialState = {
    search: {
      type: "doctor",
      languages: [],
      specialization: "",
      street: "",
      country: "",
      zipcode: "",
      distance: "15"
    },
  };

  const [state, dispatch] = useReducer(searchReducer, initialState);

  // Set Search Components
  const setSearch = (search) => {
    dispatch({ type: "SET_SEARCH", payload: search });
  };

  return (
    <SearchContext.Provider value={{ search: state.search, setSearch }}>
      {props.children}
    </SearchContext.Provider>
  );
};
export default SearchState
