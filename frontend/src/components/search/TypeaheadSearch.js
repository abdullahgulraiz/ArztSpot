import React, {Fragment, useContext} from 'react';
import {Typeahead} from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import SearchContext from "../../context/Search/searchContext";
import languages from "../../data/languages"

const TypeaheadSearch = ({props}) => {
  const {data, multiple, name, placeholder, setFunction, state} = props
  // Typeahead passes an array of objects not the event to onChange
  const onChange = (name) => values => {
    let stateField = {[name]: ""};
    stateField[name] = []
    values.forEach(value => {stateField[name].push(value.label)})
    if(!multiple) {
      stateField[name] = stateField[name][0] ? stateField[name][0] : ""
    }
    setFunction({...state, [name]: stateField[name]})
  }
  return (
    <Fragment>
      <Typeahead
        clearButton
        id={name}
        multiple={multiple}
        options={data}
        placeholder={placeholder}
        onChange={onChange(name)}
      />
    </Fragment>

  );
};

export default TypeaheadSearch;
