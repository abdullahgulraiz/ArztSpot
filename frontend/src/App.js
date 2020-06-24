import React, {useContext} from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import routes from './routes.js'
import components from "./components/components";
import {AuthProvider} from './auth/AuthState';
import {DoctorRoute, PatientRoute, NoAuthRoute} from "./auth/ProtectedRoutes";

function App() {

    return (
   <AuthProvider>
        <Router>
              <components.general.Navbar />
              <Switch>
                {/* General */}
                <Route path="/" exact component={components.general.Home} />
                <Route path={routes.about} component={components.general.About} />
                <Route path={routes.services} component={components.general.Services} />
                <Route path={routes.faqs} component={components.general.FAQS} />
                <Route path={routes.contact} component={components.general.Contact} />
                {/* Doctor */}
                <DoctorRoute path={routes.doctor.prescriptions.create} component={components.doctor.prescriptions.PrescriptionsCreate} />
                <DoctorRoute path={routes.doctor.prescriptions.patient} component={components.doctor.prescriptions.PrescriptionsPatient} />
                <DoctorRoute path={routes.doctor.prescriptions.search} component={components.doctor.prescriptions.PrescriptionsSearch} />
                {/* Auth */}
                <NoAuthRoute path={routes.auth.login} component={components.auth.Login}/>
                <NoAuthRoute path={routes.auth.register} component={components.auth.Register} />
                {/* 404 */}
                <Route component={components.general.NotFound} />
              </Switch>
              <components.general.Footer />
        </Router>
    </AuthProvider>
  );
}

export default App;
