import React, {Fragment, useContext} from 'react';
import SearchContext from "../../context/Search/searchContext";
import DoctorItem from "./DoctorItem";

const SearchResults = () => {
  const searchContext = useContext(SearchContext);
  const {doctors} = searchContext
  return (
    <Fragment>
      {doctors.map(doctor => (<DoctorItem doctor={doctor}/>))}
    </Fragment>
  );
};

export default SearchResults;
