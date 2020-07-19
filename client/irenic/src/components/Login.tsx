import React, { useRef, useState, useEffect } from 'react';

//styles
import './scss/Login.css';

import logo from '../assets/login-irenic.svg';
import backgroundlogo from '../assets/loginpage.svg';

import { login } from './api';

interface LoginProps {}

const LoginPage: React.FC<LoginProps> = () => {
  useEffect(() => {
    document.title = 'irenic | Login';
  }, []);
  return (
    <div className="login-page">
      <Login />
      <img src={backgroundlogo} alt="" />
    </div>
  );
};

const Login = () => {
  const [vailditymessage, setVailditymessage] = useState([]);

  const username_email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const username_email_v = username_email.current?.value;
    const password_v = password.current?.value;
    if (username_email_v && password_v) {
      const handleLogin = (message: any) => {
        if (typeof message === 'string') {
          window.location.reload();
        } else {
          setVailditymessage(message);
        }
      };
      if (!ValidateEmail(username_email_v)) {
        login({ username: username_email_v, password: password_v }).then(
          handleLogin
        );
      } else {
        login({ email: username_email_v, password: password_v }).then(
          handleLogin
        );
      }
    }
  };

  return (
    <form className="login">
      <img src={logo} alt="" />
      {Array.isArray(vailditymessage)
        ? vailditymessage.map((detail: { message: string }, i) => (
            <p key={i}>{detail.message}</p>
          ))
        : ''}
      <div className="form-section">
        <TextView label="email/username" valueref={username_email} />
        <TextView label="password" type="password" valueref={password} />
      </div>

      <button onClick={submit}>Log in</button>
      <span>sign up</span>
    </form>
  );
};

interface TextViewProps {
  label: string;
  type?: string;
  id?: string;
  valueref: React.RefObject<HTMLInputElement>;
  invalidmessage?: string;
  required?: boolean;
}
const TextView: React.FC<TextViewProps> = ({
  label,
  type = 'text',
  id,
  valueref,
  invalidmessage,
  required,
}) => {
  const inputDom = valueref;
  const labelDom = useRef<HTMLSpanElement>(null);

  const [focus, setfocus] = useState(false);

  useEffect(() => {
    const onfocus = () => {
      setfocus(true);
    };
    const onblur = () => {
      if (!inputDom?.current?.value) setfocus(false);
    };
    try {
      inputDom?.current?.addEventListener('focus', onfocus);
      inputDom?.current?.addEventListener('blur', onblur);
    } catch (error) {}

    return () => {
      try {
        inputDom?.current?.removeEventListener('focus', onfocus);
        // eslint-disable-next-line
        inputDom?.current?.removeEventListener('blur', onblur);
      } catch (e) {}
    };
  }, []);

  return (
    <div className="input-text">
      <span ref={labelDom} id={focus ? 'infocus' : ''}>
        {label}
        {required ? ' *' : ''}
      </span>
      <input ref={inputDom} type={type} id={id ? id : label} />
    </div>
  );
};

function ValidateEmail(mail: string) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

export default LoginPage;
