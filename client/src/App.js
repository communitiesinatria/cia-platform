import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Home from './Components/Home';
import Events from './Components/Events';
import Blogs from './Components/Blogs';
import Team from './Components/Team';

import './css/App.css';

/* import darklogo from './assets/dark-logo.png';
import lighlogo from './assets/light-logo.png' */

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/events">
            <Events />
          </Route>
          <Route path="/blogs">
            <Blogs />
          </Route>
          <Route path="/team">
            <Team />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
