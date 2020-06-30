import React from "react";
import SearchBar from "../search/SearchBar";
import Filter from "../search/Filter";


const Search = () => {
  return (
    <div
      className="container position-relative mt-5"
      data-aos="fade-up"
      data-aos-delay="100"
    >
          <SearchBar/>
          <Filter/>
    </div>
  );
};

export default Search;
