import React, {Fragment, useContext} from 'react';
import DashboardContext from "../../context/Dashboard/dashboardContext";
const SearchDay = () => {
  const dashboardContext = useContext(DashboardContext);
  const {selectedDate, setPossibleAppointments, doctor } = dashboardContext;
  const { day } = selectedDate
  const onClick = (e) => {
    setPossibleAppointments(day, doctor);
  }
  return (
    <Fragment>
      <button onClick={onClick} type="button" className={`btn btn-primary ${!day && "disabled"}`}>Primary</button>
    </Fragment>
  );
};

export default SearchDay;
