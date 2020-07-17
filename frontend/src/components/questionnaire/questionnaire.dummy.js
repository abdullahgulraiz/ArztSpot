import React, { useContext, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import routes from "../../routes";

import QuestionNeumology from "./QuestionNeumology";
import QuestionTraumatology from "./QuestionTraumatology";

import DashboardContext from "../../context/Dashboard/dashboardContext";

export default function QuestionnaireDummy() {

    const dashboardContext = useContext(DashboardContext);
    const { doctor } = dashboardContext;
    // useEffect(() => {
    //     const { pathname } = location;
    //     const doctorId = pathname.split("/")[2];
    //     // clear state (selectedDate, etc)
    //     // for example when changing from one doctor to the other
    //     // clearSlots();
    //     // clearSelectedDate();
    //     // search doctor at start
    //     if(!doctor._id) {
    //         getDoctorById(doctorId);
    //     }
    //     // avoid warning because missing dependency
    //     // eslint-disable-next-line
    // }, []);
    return(
        <div className="container position-relative mt-xl-2 mt-5" data-aos="fade-up" data-aos-delay="100">
            {doctor.specialization === 'Neumology' && <QuestionNeumology/>}
        <QuestionTraumatology/>
        </div>
    );
}