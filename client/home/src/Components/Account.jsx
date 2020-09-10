import React, { useState, useEffect, useRef } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';

import { register, login } from './api';

//styles
import background from '../assets/loginpage.svg';
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
  const history = useHistory();
  const [vailditymessage, setVailditymessage] = useState([]);

  const username_email = useRef();
  const password = useRef();

  const submit = (e) => {
    e.preventDefault();
    const username_email_v = username_email.current.value;
    const password_v = password.current.value;

    login({ username: username_email_v, password: password_v }).then(
      (message) => {
        setVailditymessage(message);
      }
    );
  };

  return (
    <form className="login">
      <h1>Log in</h1>
      {Array.isArray(vailditymessage)
        ? vailditymessage.map((detail, i) => <p key={i}>{detail.message}</p>)
        : ''}
      <div className="form-section">
        <TextView label="email/username" valueref={username_email} />
        <TextView label="password" type="password" valueref={password} />
      </div>

      <button onClick={submit}>Log in</button>
      <span onClick={() => history.push('/account/')}>sign up</span>
    </form>
  );
};
const Register = () => {
  const history = useHistory();

  const email = useRef();
  const username = useRef();
  const password = useRef();
  const retypedpassword = useRef();
  const github = useRef();
  const instagram = useRef();

  const [vailditymessage, setVailditymessage] = useState([]);

  const sendregisterdata = (e) => {
    e.preventDefault();

    (async () => {
      const emailv = email.current.value;
      const usernamev = username.current.value;
      const passwordv = password.current.value;
      const githubv = github.current.value;
      const instagramv = instagram.current.value;
      const retypedpasswordv = retypedpassword.current.value;

      if (retypedpasswordv !== passwordv) {
        setVailditymessage([{ message: 'Passwords dont match' }]);
        return;
      }
      const result = await register({
        email: emailv,
        username: usernamev,
        password: passwordv,
        github: githubv,
        instagram: instagramv,
      });

      if (Array.isArray(result)) {
        setVailditymessage(result);
      } else {
        setVailditymessage([]);
        // alert('check ur mail and verify ur email before loging in');
        history.push('/account/login');
      }
    })();
  };

  return (
    <form className="register">
      <h1>Register</h1>
      {vailditymessage
        ? vailditymessage.map((detail, i) => <p key={i}>{detail.message}</p>)
        : ''}
      <div className="form-sections">
        <div className="form-section">
          <TextView label="email" required valueref={email} />
          <TextView label="username" required valueref={username} />
          <TextView
            label="password"
            required
            type="password"
            valueref={password}
          />
        </div>

        <div className="form-section">
          <TextView label="github username" valueref={github} />
          <TextView label="instagram username" valueref={instagram} />
          <TextView
            required
            label="re-type password"
            type="password"
            valueref={retypedpassword}
          />
        </div>
      </div>

      <button onClick={sendregisterdata}>Register</button>
      <span onClick={() => history.push('/account/login')}>Log in</span>
    </form>
  );
};

const TextView = ({
  label,
  type = 'text',
  id,
  valueref,
  invalidmessage,
  required,
}) => {
  const inputDom = valueref;
  const labelDom = useRef();

  const [focus, setfocus] = useState(false);

  useEffect(() => {
    const onfocus = () => {
      setfocus(true);
    };
    const onblur = () => {
      if (!inputDom.current.value) setfocus(false);
    };
    try {
      inputDom.current.addEventListener('focus', onfocus);
      inputDom.current.addEventListener('blur', onblur);
    } catch (error) {}

    const onchange = () => {};

    return () => {
      try {
        inputDom.current.removeEventListener('focus', onfocus);
        // eslint-disable-next-line
        inputDom.current.removeEventListener('blur', onblur);
      } catch (e) {}
    };
  }, []);

  return (
    <div className="input-text">
      <span ref={labelDom} id={focus ? 'infocus' : ''}>
        {label}
        {required ? ' *' : ''}
      </span>
      <input
        onChange={onchange}
        ref={inputDom}
        type={type}
        id={id ? id : label}
      />
    </div>
  );
};
