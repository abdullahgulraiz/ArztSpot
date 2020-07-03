import React, {Fragment, useContext} from 'react';
import SearchContext from "../../context/Search/searchContext";
import DoctorItem from "./DoctorItem";

const SearchResults = () => {
  const searchContext = useContext(SearchContext);
  const {search, doctors} = searchContext
  return (
    <Fragment>
      {search.hasSearched && doctors.map(doctor => (doctor.id !== "" && (<DoctorItem doctor={doctor}/>)) ) }
    </Fragment>
  );
};

export default SearchResults;
