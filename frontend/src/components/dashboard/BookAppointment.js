import React, {Fragment, useContext, useEffect} from "react";
import routes from "../../routes";
import { Link } from "react-router-dom";
import DashboardContext from "../../context/Dashboard/dashboardContext";
import { AuthContext } from "../../context/auth/AuthState";
import { isEmptyObj } from "../../utils/isEmptyObj";

const BookAppointment = () => {
  const dashboardContext = useContext(DashboardContext);
  const {
    createAppointment,
    doctor,
    selectedDate,
    setAppointmentCreated,
    alert
  } = dashboardContext;
  const authContext = useContext(AuthContext);
  const { user, bearerToken } = authContext;
  const onClick = async (e) => {
    await createAppointment(doctor, user, selectedDate, bearerToken)
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
