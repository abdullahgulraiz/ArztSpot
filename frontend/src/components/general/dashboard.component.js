import React, { Fragment, useContext, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import routes from "../../routes";
import Dashboard from "../dashboard/Dashboard";
import DashboardContext from "../../context/Dashboard/dashboardContext";
import { Redirect } from "react-router-dom"

const DashboardPage = () => {
  const dashboardContext = useContext(DashboardContext);
  const {
    appointmentCreated
  } = dashboardContext;

  return (
    <Fragment>
      {appointmentCreated ? <Redirect to={routes.appointmentCreated}/> : <Dashboard/>}
    </Fragment>
  );
};

export default DashboardPage;
