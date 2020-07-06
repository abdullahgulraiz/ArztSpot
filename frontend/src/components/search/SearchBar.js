import React, { useContext } from "react";
import SearchContext from "../../context/Search/searchContext";

const SearchBar = () => {
  const searchContext = useContext(SearchContext);
  const { search, setSearch } = searchContext;
  const { type } = search;
  const onSubmit = (e) => {};
  const onChange = (e) =>
    setSearch({ ...search, [e.target.name]: e.target.value });

  return (
    <div className="row">
      <form onSubmit={onSubmit} className="form-inline col-xs-8 col-sm-12" >
        <div className="form-group form-check-inline">
          Search for:{" "}
          <label className="form-check-label mr-2 ml-2" id="inlineRadio1">
            Doctors
          </label>
          <input
            className="form-check-input"
            for="inlineRadio1"
            type="radio"
            name="type"
            value="doctor"
            checked = {type === "doctor"}
            onChange={onChange}
          />
        </div>
        <div className="form-group form-check-inline">
          <label className="form-check-label mr-2" id="inlineRadio2">
            Hospitals
          </label>
          <input
            className="form-check-input"
            htmlFor="inlineRadio2"
            type="radio"
            name="type"
            value="hospital"
            checked = {type === "hospital"}
            onChange={onChange}
          />
        </div>
        <div className="form-group form-inline">
          <input
            className="form-input"
            htmlFor="inlineRadio2"
            type="text"
            name="type"
            placeholder="Search..."
            onChange={onChange}
          />
        </div>
        <div className="form-group form-inline"><button className="btn btn-primary btn-block ml-3">Search</button></div>
      </form>
    </div>
  );
};

export default SearchBar;
