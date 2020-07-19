import React, { Fragment, useContext, useEffect } from "react";
import DoctorItem from "./DoctorItem";
import SearchContext from "../../../context/Search/searchContext";
import Loading from "../../general/loading.component";

const Doctors = () => {
  const searchContext = useContext(SearchContext);
  const { search, doctors } = searchContext;
  // useEffect(() => {
  //   setTimeout(() =>{setResultsLoaded({ ...search, resultsLoaded: true })}, 2000);
  //   // eslint-disable-next-line
  // },[])
  return (
    <Fragment>
      {doctors.map(
        // if doctors do not have a hospital assigned yet, do not show them on the search results
        (doctor, i) =>
          doctor.id !== "" &&
          doctor.hospital && <DoctorItem key={i} doctor={doctor} />
      )}
    </Fragment>
  );
};

export default Doctors;
