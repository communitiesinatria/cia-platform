import React, { useEffect } from 'react';

import './App.css';
/* import Cookies from 'universal-cookie'; */

// components
import Home from './components/home/Home';

import { login } from './components/api';

// GlobalContext
import {GlobalContextProvider} from './components/GlobalContext'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from 'react-router-dom';

function App() {
  useEffect(() => {
    
  });
  return (
    <GlobalContextProvider>
      <Home />
    </GlobalContextProvider>
  );
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
