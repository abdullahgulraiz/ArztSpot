import React, { Fragment, useContext, useEffect } from "react";
import { AuthContext } from "../../auth/AuthState";
import NotFound from "./notfound.component";
import { isEmptyObj } from "../../utils/isEmptyObj";
import routes from "../../routes";
import DashboardContext from "../../context/Dashboard/dashboardContext";

const Success = () => {
  const authContext = useContext(AuthContext);
  const dashboardContext = useContext(DashboardContext);
  const { setAppointmentCreated } = dashboardContext;
  const { user } = authContext;
  useEffect(() => {
    // reset original state
    setAppointmentCreated(false);
  }, []);
  return (
    <Fragment>
      {isEmptyObj(user) ? (
        <NotFound />
      ) : (
        <div className="container mt-5" data-aos="fade-up">
          <div className="section-title">
            <i className="icofont-bullseye" style={{"fontSize": "60px"}}/>
            <h2>Appointment Created Successfully</h2>
            <div className="row content">
              <div className="col-12">
                <p className="text-center">
                  <a href="#">
                    <b>Go to home page</b>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Success;
