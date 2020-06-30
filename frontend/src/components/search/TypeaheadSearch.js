import React, {Fragment, useContext} from 'react';
import {Typeahead} from "react-bootstrap-typeahead";
import SearchContext from "../../context/Search/searchContext";
import languages from "../../data/languages"

const TypeaheadSearch = ({props}) => {
  const {data, multiple, name, setFunction, state} = props
  // Typeahead passes an array of objects not the event to onChange
  const onChange = (name) => values => {
    let stateField = {[name]: ""};
    if (multiple) {
      stateField[name] = []
      values.forEach(value => {stateField[name].push(value.label)})
    } else {
      stateField[name] = values[0].label
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
        placeholder="Language..."
        onChange={onChange(name)}
      />
    </Fragment>

  );
};

export default TypeaheadSearch;
