import DashboardContext from "../../context/Dashboard/dashboardContext";
import React, {Fragment, useContext, useEffect} from "react";
import {useLocation} from "react-router-dom";

import BookAppointment from "../dashboard/BookAppointment";


const Dashboard = () => {
    const dashboardContext = useContext(DashboardContext);
    const { doctor } = dashboardContext;
    useEffect(() => {
        const { pathname } = location;
        const doctorId = pathname.split("/")[2];
        if(doctor.specialty ==) {
            getDoctorById(doctorId);
        }
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