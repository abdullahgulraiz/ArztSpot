import React from "react";
import SearchBar from "../search/SearchBar";
import Filter from "../search/Filter";
import SearchResults from "../search/SearchResults";


const Search = () => {
  return (
    <div
      className="container position-relative mt-2"
      data-aos="fade-up"
      data-aos-delay="100"
    >
          <SearchBar/>
          <div className="row mt-5">
            <div className="card h-75 col-md-4 mx-auto mb-4 mx-md-0" style={{"max-width": "400px"}}>
              <Filter/>
            </div>
            <div className=" col-md-7 offset-md-1 offset-md-0">
              <SearchResults />
            </div>

          </div>

    </div>
  );
};

export default Search;
