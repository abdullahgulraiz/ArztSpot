import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Navbar from "./components/navbar.component"
import Home from "./components/home.component"
import About from "./components/about.component"
import Services from "./components/services.component"
import FAQS from "./components/faqs.component"
import Contact from "./components/contact.component"
import Footer from "./components/footer.component"
import NotFound from "./components/notfound.component"

function App() {
  return (
    <Router>

      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/faqs" component={FAQS} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
      <Footer />

    </Router>
  );
}

export default App;
