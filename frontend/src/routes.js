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
    // editQuestionnaire: "/editQuestionnaire",
    questionnaire: "/questionnaire",
    appointmentCreated: "/success",
    profile: "/profile",

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
        }),
        // questionnaires
        questionnaires: include('questionnaires', {
            main: ''
        })
    }),

    // patient
    patient: include('/user', {
        // prescriptions
        prescriptions: include('prescriptions', {
            main: ''
        })
    }),
}