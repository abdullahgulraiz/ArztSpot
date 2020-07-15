import React, { Fragment, useContext } from "react";
import routes from "../../routes";
import { Link, Redirect } from "react-router-dom";
import DashboardContext from "../../context/Dashboard/dashboardContext";
import { AuthContext } from "../../auth/AuthState";
import { isEmptyObj } from "../../utils/isEmptyObj";

const BookAppointment = () => {
  const dashboardContext = useContext(DashboardContext);
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  let clicked = false;
  const onClick = (e) => {
    clicked = true;
    if (isEmptyObj(user)) {
      console.log("Redirect to login");
    } else {
      console.log("Create new appointment");
    }
  };
  return (
    <Fragment>
      {isEmptyObj(user) ? (
        <Link to={routes.auth.login}>
          <button className="btn btn-success btn-block">
            Please Login to Book Appointment
          </button>
        </Link>
      ) : (
        <button
          className="btn btn-success btn-block"
          onClick={onClick}
          type="submit"
        >
          Book Appointment
        </button>
      )}
    </Fragment>
  );
};

export default BookAppointment;
