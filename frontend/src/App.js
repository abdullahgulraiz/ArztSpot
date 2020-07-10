import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./routes.js";
import components from "./components/components";
import { AuthProvider } from "./auth/AuthState";
import SearchState from "./context/Search/SearchState";
import { DoctorRoute, PatientRoute } from "./auth/ProtectedRoutes";

function App() {
  return (
    <AuthProvider>
      <SearchState>
        <Router>
              <components.general.Navbar />
              <Switch>
                {/* General */}
                <Route path="/" exact component={components.general.Home} />
                <Route path={routes.about} component={components.general.About} />
                <Route path={routes.services} component={components.general.Services} />
                <Route path={routes.faqs} component={components.general.FAQS} />
                <Route path={routes.contact} component={components.general.Contact} />
                <Route path={routes.search} component={components.general.Search} />
                {/* Doctor */}
                <DoctorRoute path={routes.doctor.prescriptions.create} component={components.doctor.prescriptions.PrescriptionsCreate} />
                <DoctorRoute path={routes.doctor.prescriptions.patient} component={components.doctor.prescriptions.PrescriptionsPatient} />
                <DoctorRoute path={routes.doctor.prescriptions.search} component={components.doctor.prescriptions.PrescriptionsSearch} />
                {/* Auth */}
                <Route path={routes.auth.login} component={components.auth.Login}/>
                <Route path={routes.auth.register} component={components.auth.Register} />
                <Route path={routes.auth.forgot} component={components.auth.ForgotPassword}/>
                {/* 404 */}
                <Route component={components.general.NotFound} />
              </Switch>
              <components.general.Footer />
        </Router>
      </SearchState>
    </AuthProvider>
  );
}

export default App;
