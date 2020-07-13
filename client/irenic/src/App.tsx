import React, { useEffect } from 'react';

import './App.css';
/* import Cookies from 'universal-cookie'; */

// components
import Home from './components/home/Home';

import { login } from './components/api';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from 'react-router-dom';

function App() {
  useEffect(() => {
    // login({ username: 'raj', password: 'adminpassword' });
  });
  return <Home />;
}

/* const Test = () => {
  const history = useHistory();
  useEffect(() => {
    const cookies = new Cookies();
    console.log(cookies.get('token'));
    history.push('/test');
  });

  return <div className="App"></div>;
}; */

export default App;
