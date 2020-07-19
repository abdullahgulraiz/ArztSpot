import React, {Fragment, useContext, useEffect} from "react";
import DashboardContext from "../../context/Dashboard/dashboardContext";
import TypeaheadSearch from "../search/TypeaheadSearch";

const SelectSymptoms = () => {
  const dashboardContext = useContext(DashboardContext);
  const {
    selectedSymptoms,
    setSelectedSymptoms,
    allSymptoms
  } = dashboardContext;
  return (
    <Fragment>
      <h6 className="card-subtitle my-2 text-muted">Please select any symptoms for your doctor's information:</h6>{" "}
      <TypeaheadSearch
          props={{
            data: allSymptoms,
            multiple: true,
            name: "data",
            setFunction: setSelectedSymptoms,
            state: selectedSymptoms,
            placeholder: "Symptoms"
          }}
      />
      <br/>
    </Fragment>
  );
};

export default SelectSymptoms;
