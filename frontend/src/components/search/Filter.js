import React, { useContext, Fragment } from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import languages from "../../data/languages";
import specialization from "../../data/specialization";
import SearchContext from "../../context/Search/searchContext";
import TypeaheadSearch from "./TypeaheadSearch";
import LocationSearch from "./LocationSearch";

const Filter = () => {
  const searchContext = useContext(SearchContext);
  const { search, setSearch, doctorSearch } = searchContext;
  const onSubmit = (e) => {
    e.preventDefault();
    doctorSearch(search)
  }
  return (
      <div className="card-body" >
        <h5 className="card-title text-center">
          <strong>Filter</strong>
        </h5>
        <form onSubmit={onSubmit}>
          {search.type === "doctor" && (
            <Fragment>
              <h6 className="card-subtitle my-2 text-muted">Spoken Language</h6>{" "}
              <TypeaheadSearch
                props={{
                  data: languages,
                  multiple: true,
                  name: "languages",
                  setFunction: setSearch,
                  state: search,
                }}
              />{" "}
              <h6 className="card-subtitle my-2 text-muted">
                Doctor Specialization
              </h6>
              <TypeaheadSearch
                props={{
                  data: specialization,
                  multiple: false,
                  name: "specialization",
                  setFunction: setSearch,
                  state: search,
                }}
              />
            </Fragment>
          )}
          <LocationSearch />
          <div>
            <button type="submit" className="btn btn-outline-dark btn-light btn-block">
              Apply
            </button>
          </div>
        </form>
      </div>
  );
};

export default Filter;
