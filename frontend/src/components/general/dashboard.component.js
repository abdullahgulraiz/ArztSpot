import React, {Fragment, useContext, useEffect} from "react";
import Description from "../dashboard/Description";
import DashboardContext from "../../context/Dashboard/dashboardContext";
import NotFound from "./notfound.component"
import {useLocation} from "react-router-dom";

const Dashboard = () => {
  const dashboardContext = useContext(DashboardContext);
  const {error, getDoctorById} = dashboardContext;
  const location = useLocation();
  useEffect(() => {
    const {pathname} = location
    const doctorId = pathname.split('/')[2]
    // search doctor at start
    getDoctorById(doctorId)
    console.log(error)
  }, [])

  return (
    <Fragment>
    {(!error) ? ( <div
      className="container position-relative mt-xl-2 mt-5"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <div className=" col-md-6">
        <Description/>
      </div>

    </div>) : <NotFound/>}
    </Fragment>
  );
};

export default Dashboard;
