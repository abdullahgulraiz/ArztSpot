import { include } from 'named-urls'

export default {
    // general
    home: "/",
    about: "/about",
    services: "/services",
    faqs: "/faqs",
    contact: "/contact",
    search: "/search",

    // auth
    auth: include('/auth', {
        login: 'login',
        register: 'register'
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