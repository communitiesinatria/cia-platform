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
import '../css/Home.css';

// Components

import Activity from './Activity';
import Nav from './Nav';
import Feed from './Feed';
import Notifications from './Notifications';
import Profile from './Profile';
import Settings from './Settings';

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
          <Route path="/settings">
            <Settings />
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
