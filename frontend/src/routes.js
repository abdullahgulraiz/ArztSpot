import { include } from 'named-urls'

export default {
    //general
    home: "/",
    about: "/about",
    services: "/services",
    faqs: "/faqs",
    contact: "/contact",

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