import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Cookies from 'universal-cookie';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router basename="/irenic">
        <Test />
      </Router>
    </div>
  );
}

const Test = () => {
  const history = useHistory();
  useEffect(() => {
    const cookies = new Cookies();
    console.log(cookies.get('token'));
    history.push('/test');
  });

  return <div className="App"></div>;
};

export default App;
