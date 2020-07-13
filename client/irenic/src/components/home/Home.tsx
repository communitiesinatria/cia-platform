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

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <Router basename="/irenic">
      <div className="home">
        <Nav />
        <Switch>
          <Route path="/home">
            <Feed />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
        <Activity />
      </div>
    </Router>
  );
};

export default Home;