/* General */
import Navbar from "./general/navbar.component"
import Home from "./general/home.component"
import About from "./general/about.component"
import Services from "./general/services.component"
import FAQS from "./general/faqs.component"
import Contact from "./general/contact.component"
import Footer from "./general/footer.component"
import NotFound from "./general/notfound.component"
/* Doctors */
import PrescriptionsSearch from "./doctor/prescriptions/search.component"
import PrescriptionsPatient from "./doctor/prescriptions/patient.component"
import PrescriptionsCreate from "./doctor/prescriptions/create.component"

export default {
    general: {
        Navbar,
        Home,
        About,
        Services,
        FAQS,
        Contact,
        Footer,
        NotFound
    },
    doctor: {
        prescriptions: {
            PrescriptionsSearch,
            PrescriptionsPatient,
            PrescriptionsCreate
        }
    }
}