import React, { Fragment, useContext, useEffect } from "react";
import Description from "../dashboard/Description";
import CalendarItem from "../dashboard/CalendarItem";
import "react-calendar/dist/Calendar.css";
import DashboardContext from "../../context/Dashboard/dashboardContext";
import NotFound from "../general/notfound.component";
import { useLocation } from "react-router-dom";
import TimeSlot from "../dashboard/TimeSlot";
import Alert from "../dashboard/Alert";
import BookAppointment from "../dashboard/BookAppointment";

const Dashboard = () => {
  const dashboardContext = useContext(DashboardContext);
  const {
    error,
    alert,
    getDoctorById,
    selectedDate,
    doctor,
    clearSlots,
    clearSelectedDate,
  } = dashboardContext;
  const location = useLocation();
  useEffect(() => {
    const { pathname } = location;
    const doctorId = pathname.split("/")[2];
    // clear state (selectedDate, etc)
    // for example when changing from one doctor to the other
    // clearSlots();
    // clearSelectedDate();
    // search doctor at start
    if(!doctor._id) {
      getDoctorById(doctorId);
    }
    // avoid warning because missing dependency
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {!error ? (
        <div
          className="container position-relative mt-xl-2 mt-5"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="row">
            <div className=" col-md-6">
              <Description />
            </div>
            <div className="col-md-6 mt-5">
              {alert && <Alert msg="Appointment already exists"/>}
              <br/>
              <CalendarItem />
              <br/>
              <div className="">
                {selectedDate.day && <TimeSlot />}
                <br/>
                <br/>
                {selectedDate.timeSlot && <BookAppointment />}
              </div>

            </div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </Fragment>
  );
};

export default Dashboard;
