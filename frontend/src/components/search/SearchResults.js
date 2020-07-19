import React, { Fragment, useContext } from "react";
import SearchContext from "../../context/Search/searchContext";
import Doctors from "./Doctors/Doctors";
import Pagination from "../general/Pagination";
import Loading from "../general/loading.component";

const SearchResults = () => {
  const searchContext = useContext(SearchContext);
  const { search, doctorSearch, pagination } = searchContext;
  if (search.hasSearched && search.resultsLoaded) {
    return (
      <Fragment>
        <Doctors />
        <Pagination
          searchFunc={doctorSearch}
          pagination={pagination}
          searchParams={search}
        />
      </Fragment>
    );
  } else if (search.hasSearched) {
    return (
      <div className="offset-6 text-primary" >
        <Loading />
      </div>
    );
  } else {
    // if user has not search return nothing
    return null;
  }
};

export default SearchResults;
