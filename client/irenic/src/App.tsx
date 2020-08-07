import React, { useEffect, useContext } from 'react';

import './App.css';
/* import Cookies from 'universal-cookie'; */
import { GlobalContext } from './components/GlobalContext';

// components
import Login from './components/Login';
import Home from './components/home/Home';

import { checkAuth } from './components/api';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from 'react-router-dom';

function App() {
  const { user, setUser } = useContext(GlobalContext);
  useEffect(() => {
    // login({ username: 'raj', password: 'adminpassword' });

    checkAuth().then((newuser) => {
      setUser && setUser(newuser);
    });
  }, []);

  useEffect(() => {
    try {
      setTimeout(() =>
        document
          .querySelectorAll('.loading-page')
          .forEach((e: any) => (e.style.display = 'none'))
      );
    } catch (error) {}
  }, []);

  if (user?.username) return <Home />;
  return <Login />;
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
