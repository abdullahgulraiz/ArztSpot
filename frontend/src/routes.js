import { include } from 'named-urls'

export default {
    // general
    home: "/",
    about: "/about",
    services: "/services",
    faqs: "/faqs",
    contact: "/contact",
    search: "/search",
    dashboard: "/doctors/:doctorId",
    questionnaire: "/questionnaire",
    appointmentCreated: "/success",

    // auth
    auth: include('/auth', {
        login: 'login',
        register: 'register',
        forgot: 'forgot'
    }),

    // doctor
    doctor: include('/doctor', {
        // prescriptions
        prescriptions: include('prescriptions', {
            search: '',
            patient: 'patient/:patientId',
            create: 'patient/:patientId/create'
        })
    }),
}