import React, { useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
// assets
import irenic_logo from '../../assets/irenic.svg';
const Nav: React.FC = () => {
  return (
    <div className="nav">
      <header>
        <img src={irenic_logo} alt="irenic" />
      </header>
      <div className="nav-links">
        <NavLink to="/home" label="Home" />
        <NavLink to="/notifications" label="Notifications" />
        <NavLink to="/profile" label="Profile" />
      </div>
    </div>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
}
const NavLink: React.FC<NavLinkProps> = ({ to, label }) => {
  const history = useHistory();
  const [currentpath, setCurrentpath] = useState<string>(
    history.location.pathname
  );

  useEffect(() => {
    history.listen(({ pathname }) => setCurrentpath(pathname));

    axios
      .get('http://localhost:8000/auth/user', { withCredentials: true })
      .then((d) => console.log(d));
  }, [history]);

  interface Icons {
    Home?: string[];
    Notifications?: string[];
    Profile?: string[];
  }

  const icons = {
    Home: [
      'https://img.icons8.com/material-outlined/24/000000/home--v2.png',
      'https://img.icons8.com/material/24/000000/home--v5.png',
    ],
    Notifications: [
      'https://img.icons8.com/material-outlined/24/000000/appointment-reminders.png',
      'https://img.icons8.com/material-rounded/24/000000/appointment-reminders.png',
    ],
    Profile: [
      'https://img.icons8.com/material-outlined/24/000000/user-male-circle.png',
      'https://img.icons8.com/material/24/000000/user-male-circle--v1.png',
    ],
  };

  return (
    <div
      className={currentpath === to ? 'nav-link selected-nav-link' : 'nav-link'}
    >
      <Link to={to}>
        <img
          src={icons[label as keyof Icons][Number(currentpath === to)]}
          alt=""
        />
        <span>{label}</span>
      </Link>
    </div>
  );
};

export default Nav;
