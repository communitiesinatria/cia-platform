import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from 'react-router-dom';

import Home from './Components/Home';
import Events from './Components/Events';
import Team from './Components/Team';
import Account from './Components/Account';

//styles
import './css/App.css';

/* import darklogo from './assets/dark-logo.png';
import lighlogo from './assets/light-logo.png' */
import fullimg from './assets/loginpage.svg';

import { redirectIrenic } from './Components/api';
import Cookies from 'universal-cookie';

function App() {
  const cookies = new Cookies();
  const token = cookies.get('token');
  useEffect(() => {
    try {
      document.querySelector('.loading-page').style.display = 'none';
    } catch (error) {}
  }, []);

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
          <Route path="/team">
            <Team />
          </Route>
          <Route path="/account">{!token ? <Account /> : <Irenic />}</Route>
          <Route>
            <Page404 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
function Irenic() {
  redirectIrenic();
  return <></>;
}

function Page404() {
  return (
    <div className="page404">
      <img src={fullimg} alt="404" />

      <h1>404</h1>
      <p>page not found</p>
    </div>
  );
}

export default App;
