import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./routes.js";
import components from "./components/components";
import { AuthProvider } from "./context/auth/AuthState";
import SearchState from "./context/Search/SearchState";
import DashboardState from "./context/Dashboard/DashboardState";
import {DoctorRoute, AuthRoute, PatientRoute} from "./context/auth/ProtectedRoutes";
import ProfileState from "./context/Profile/profileState";
import {QuestionnaireProvider} from "./context/Questionnaire/QuestionnaireState";

function App() {
  return (
    <AuthProvider>
      <SearchState>
        <DashboardState>
          <ProfileState>
            <QuestionnaireProvider>
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
                <Route path={routes.dashboard} component={components.general.DashboardPage} />
                <Route path={routes.appointmentCreated} component={components.general.Success} />
                <Route path={routes.questionnaire} component={components.general.Questionnaire} />
                {/*<Route path={routes.editQuestionnaire} component={components.general.EditQuestionnaire} />*/}
                <AuthRoute path={routes.profile} component={components.general.UserProfilePage} />
                  {/* Doctor */}
                <PatientRoute path={routes.profile} component={components.general.UserProfilePage} />
                {/* Doctor */}
                <DoctorRoute path={routes.doctor.prescriptions.create} component={components.doctor.prescriptions.PrescriptionsCreate} />
                <DoctorRoute path={routes.doctor.prescriptions.patient} component={components.doctor.prescriptions.PrescriptionsPatient} />
                <DoctorRoute path={routes.doctor.prescriptions.search} component={components.doctor.prescriptions.PrescriptionsSearch} />
                {/* Patient */}
                <PatientRoute path={routes.patient.prescriptions.main} component={components.patient.prescriptions.PrescriptionsMainPatient} />
                {/* Auth */}
                <Route path={routes.auth.login} component={components.auth.Login}/>
                <Route path={routes.auth.register} component={components.auth.Register} />
                <Route path={routes.auth.forgot} component={components.auth.ForgotPassword}/>
                {/* 404 */}
                <Route component={components.general.NotFound} />
              </Switch>
              <components.general.Footer />
        </Router>
            </QuestionnaireProvider>
          </ProfileState>
        </DashboardState>
      </SearchState>
    </AuthProvider>
  );
}

export default App;
