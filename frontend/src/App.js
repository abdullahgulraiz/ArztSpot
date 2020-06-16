import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import routes from './routes.js'
import components from "./components/components";

function App() {
  return (
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
        <Route path={routes.doctor.prescriptions.create} component={components.doctor.prescriptions.PrescriptionsCreate} />
        <Route path={routes.doctor.prescriptions.patient} component={components.doctor.prescriptions.PrescriptionsPatient} />
        <Route path={routes.doctor.prescriptions.search} component={components.doctor.prescriptions.PrescriptionsSearch} />
        {/* 404 */}
        <Route component={components.general.NotFound} />
      </Switch>
      <components.general.Footer />

    </Router>
  );
}

export default App;
