import React, { useContext, Fragment } from "react";
import languages from "../../data/languages";
import specialization from "../../data/specialization";
import SearchContext from "../../context/Search/searchContext";
import TypeaheadSearch from "./TypeaheadSearch";
import LocationSearch from "./LocationSearch";
import { useForm } from "react-hook-form";

const Filter = () => {
  const { handleSubmit, register } = useForm();
  const searchContext = useContext(SearchContext);
  const { search, setSearch, doctorSearch, pagination } = searchContext;
  const onSubmit = (data) => {
    if (
      (!data.street && !data.country && !data.zipcode) ||
      (data.street && data.country && data.zipcode)
    ) {
      setSearch({ ...search, hasSearched: true, resultsLoaded: false, errorLocation: false });
      doctorSearch(search, pagination.page);
    } else {
      setSearch({ ...search, errorLocation: true });
    }

  };
  return (
    <div className="card-body">
      <h5 className="card-title text-center">
        <strong>Filter</strong>
      </h5>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                placeholder: "Language..."
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
                placeholder: "Specialization..."
              }}
            />
          </Fragment>
        )}
        <LocationSearch register={register} />

        <div>
          <button
            type="submit"
            className="btn btn-outline-dark btn-light btn-block"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
