import React, {Fragment, useContext, useEffect} from 'react';
import DoctorItem from "./DoctorItem";
import SearchContext from "../../../context/Search/searchContext";


const Doctors = () => {
  const searchContext = useContext(SearchContext);
  const { search, doctors, setResultsLoaded } = searchContext;
  useEffect(() => {
    setTimeout(() =>{setResultsLoaded({ ...search, resultsLoaded: true })}, 2000);
  },[])
  return (
    <Fragment>
      {
      doctors.map(
        (doctor, i) => doctor.id !== "" && <DoctorItem key={i} doctor={doctor} />
      )}
    </Fragment>
  );
};

export default Doctors;
