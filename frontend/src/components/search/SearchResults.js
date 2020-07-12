import React, { Fragment, useContext } from "react";
import SearchContext from "../../context/Search/searchContext";
import DoctorItem from "./Doctors/DoctorItem";
import Pagination from "../general/Pagination";

const SearchResults = () => {
  const searchContext = useContext(SearchContext);
  const { search, doctors, doctorSearch, pagination } = searchContext;

  return (
    <Fragment>
      {search.hasSearched &&
        doctors.map(
          (doctor) => doctor.id !== "" && <DoctorItem doctor={doctor} />
        )}
      {search.hasSearched && (
        <Pagination searchFunc={doctorSearch} pagination={pagination} searchParams={search}/>
      )}
    </Fragment>
  );
};

export default SearchResults;
