import React, { useContext } from "react";
import SearchContext from "../../context/Search/searchContext";

const SearchBar = () => {
  const searchContext = useContext(SearchContext);
  const { search, setSearch, doctorSearch, pagination } = searchContext;
  const { type, query } = search;
  const onSubmit = (e) => {
    e.preventDefault()
    setSearch({ ...search, hasSearched: true, resultsLoaded: false, errorLocation: false });
    doctorSearch(search, pagination.page);
  };
  const onChange = (e) =>
    setSearch({ ...search, [e.target.name]: e.target.value });

  return (
    <div className="row">
      <form onSubmit={onSubmit} className="form-inline col-xs-8 col-sm-12" >
        <div className="form-group form-inline">
          <label className="form-check-label mr-2" id="inlineRadio2">
            Search by lastname
          </label>
          <input
            className="form-input"
            type="text"
            name="query"
            value={query}
            placeholder="Search..."
            onChange={onChange}
          />
        </div>
        <div className="form-group form-inline"><button type="submit" className="btn btn-primary btn-block ml-3">Search</button></div>
      </form>
    </div>
  );
};

export default SearchBar;
