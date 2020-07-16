import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  Link,
  Redirect,
} from 'react-router-dom';

//styles
import '../scss/Home.css';

// Components

import Activity from './Activity';
import Nav from './Nav';
import Feed from './Feed';
import Notifications from './Notifications';
import Profile from './Profile';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <Router basename="/irenic">
      <div className="home">
        <Nav />
        <Switch>
          <Route path="/home">
            <Feed />
            <Activity />
          </Route>
          <Route path="/notifications">
            <Notifications />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </div>
    </Router>
  );
};

export default Home;
