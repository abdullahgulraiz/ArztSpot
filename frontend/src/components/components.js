/* General */
import {Navbar} from "./general/navbar.component"
import Home from "./general/home.component"
import About from "./general/about.component"
import Services from "./general/services.component"
import FAQS from "./general/faqs.component"
import Contact from "./general/contact.component"
import {Footer} from "./general/footer.component"
import NotFound from "./general/notfound.component"
import Unauthorized from "./general/unauthorized.component"
/* Auth */
import {Login} from "./auth/login.component"
import Register from "./auth/register.component"
import ForgotPassword from "./auth/forgot.component"
/* Doctors */
import {PrescriptionsSearch} from "./doctor/prescriptions/search.component"
import {PrescriptionsPatient} from "./doctor/prescriptions/patient.component"
import {PrescriptionsCreate} from "./doctor/prescriptions/create.component"
import {QuestionsMainDoctor} from "./doctor/questionnaires/main.component"
import {QuestionsNewDoctor} from "./doctor/questionnaires/new.component"
/* General Search (Doctors, Hospitals) */
import Search from "./general/search.component";
import DashboardPage from "./general/dashboard.component";
import Success from "./general/appointmentCreated.component";
import UserProfilePage from "./general/userprofile.component";
/* Patients */
import {PrescriptionsMainPatient} from "./patient/prescriptions/main.component"

export default {
    general: {
        Navbar,
        Home,
        About,
        Services,
        FAQS,
        Contact,
        Footer,
        NotFound,
        Unauthorized,
        Search,
        DashboardPage,
        Success,
        UserProfilePage
    },
    auth: {
        Login,
        Register,
        ForgotPassword
    },
    doctor: {
        prescriptions: {
            PrescriptionsSearch,
            PrescriptionsPatient,
            PrescriptionsCreate
        },
        questions: {
            QuestionsMainDoctor,
            QuestionsNewDoctor
        },
    },
    patient: {
        prescriptions: {
            PrescriptionsMainPatient
        }
    },
}