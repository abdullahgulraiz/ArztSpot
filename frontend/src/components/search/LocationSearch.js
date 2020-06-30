import React, { Fragment, useContext } from "react";
import SearchContext from "../../context/Search/searchContext";

const LocationSearch = () => {
  const searchContext = useContext(SearchContext);
  const { search, setSearch } = searchContext;
  const { street, country, zipcode, distance } = search;
  const onChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };
  return (
    <Fragment>
      <h6 className="card-subtitle my-2 text-muted">Search around</h6>
      <div className="rbt">
        <div className="">
          <input
            className="rbt-input-main form-control form-inline rbt-input"
            placeholder="Barer Straße 80..."
            type="text"
            id="street"
            name="street"
            value={street}
            onChange={onChange}
          />
        </div>
        <div className="form-row pt-2">
          <div className="form-group col-8">
            <input
              className="form-control"
              placeholder="Country"
              type="text"
              id="inputCountry"
              name="country"
              value={country}
              onChange={onChange}
            />
          </div>
          <div className="form-group col-4">
            <input
              className="form-control"
              placeholder="Zipcode"
              type="text"
              id="inputZip"
              name="zipcode"
              value={zipcode}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="formControlRange">
            Distance: <span id="ex6SliderVal">{distance} km</span>
          </label>
          <input
            type="range"
            min="0"
            max="50"
            value={distance}
            name="distance"
            className="form-control-range"
            id="inputDistance"
            onChange={onChange}
          />
        </div>

      </div>
    </Fragment>
  );
};

export default LocationSearch;
