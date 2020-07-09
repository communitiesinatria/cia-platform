import React, { useState, useEffect, useRef } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';

//styles
import background from '../assets/loginpage.png';
import './css/form-elements.css';
import './css/Account.css';

export default function Account() {
  return (
    <div className="account-page">
      <img src={background} alt="background" />
      <Router>
        <Switch>
          <Route path="/account/login">
            <Login />
          </Route>
          <Route path="/account">
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const Login = () => {

    const history=useHistory();
  return (
    <form className="login">
      <h1>Log in</h1>

      
        <div className="form-section">
          <TextView label="email/username" />
          <TextView label="password" type="password" />
        </div>
      

      <button>Log in</button>
      <span onClick={() => history.push('/account/')}>sign up</span>
    </form>
  );
};
const Register = () => {
    const history = useHistory();
  return (
    <form className="register">
      <h1>Register</h1>

      <div className="form-sections">
        <div className="form-section">
          <TextView label="email" />
          <TextView label="username" />
          <TextView label="password" type="password" />
        </div>

        <div className="form-section">
          <TextView label="github username" />
          <TextView label="instagram username" />
          <TextView label="re-type password" type="password" />
        </div>
      </div>

      <button>Register</button>
      <span onClick={() => history.push('/account/login')}>Log in</span>
    </form>
  );
};

const TextView = ({ label, type = 'text', id, validation }) => {
  const inputDom = useRef();
  const labelDom = useRef();
  const [focus, setfocus] = useState(false);

  useEffect(() => {
    const onfocus = () => {
      setfocus(true);
    };
    const onblur = () => {
      setfocus(false);
    };
    inputDom.current.addEventListener('focus', onfocus);
    inputDom.current.addEventListener('blur', onblur);

    return () => {
      try {
        inputDom.current.removeEventListener('focus', onfocus);
        inputDom.current.removeEventListener('blur', onblur);
      } catch (e) {}
    };
  }, []);

  return (
    <div className="input-text">
      <span ref={labelDom} id={focus ? 'infocus' : ''}>
        {label}
      </span>
      <input ref={inputDom} type={type} id={id ? id : label} />
    </div>
  );
};
