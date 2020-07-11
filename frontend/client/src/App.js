import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Components/Home';
import Events from './Components/Events';
import Blogs from './Components/Blogs';
import Team from './Components/Team';
import Account from './Components/Account';

//styles
import './css/App.css';

/* import darklogo from './assets/dark-logo.png';
import lighlogo from './assets/light-logo.png' */
import fullimg from './assets/loginpage.svg'

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
          <Route path="/account">
            <Account />
          </Route>
          <Route>
            <Page404 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function Page404(){

  return (
    <div className="page404">
      <img src={fullimg} alt="404" />

      <h1>404</h1>
      <p>page not found</p>
    </div>
  );
}

export default App;
