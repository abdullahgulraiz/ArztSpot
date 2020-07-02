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
    setSearch({...search, hasSearched: true})
    doctorSearch(search)
  }
  return (
    <div className="card col-xl-4 col-lg-6 col-md-6 col-sm-12 mt-5">
      <div className="card-body">
        <h5 className="card-title text-center">
          <strong>Filter</strong>
        </h5>
        <form>
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
            <button className="btn btn-outline-dark btn-light btn-block">
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Filter;
