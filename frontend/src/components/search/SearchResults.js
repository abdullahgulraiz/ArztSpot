import React, { Fragment, useContext } from "react";
import SearchContext from "../../context/Search/searchContext";
import Doctors from "./Doctors/Doctors";
import Pagination from "../general/Pagination";

const SearchResults = () => {
  const searchContext = useContext(SearchContext);
  const { search, doctorSearch, pagination } = searchContext;

  return (
    <Fragment>
      {search.hasSearched && <Doctors/>}
      {(search.hasSearched && search.resultsLoaded) && (
        <Pagination searchFunc={doctorSearch} pagination={pagination} searchParams={search}/>
      )}
    </Fragment>
  );
};

export default SearchResults;
