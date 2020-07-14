import React, { useContext, useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
// import axios from 'axios';

// Context
import { GlobalContext } from '../GlobalContext';
// types
import { User } from '../ContextTypes';
// assets
import irenic_logo from '../../assets/irenic.svg';
const Nav: React.FC = () => {
  const { user } = useContext(GlobalContext);
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

      <LoggedinProfile user={user} />
    </div>
  );
};

const LoggedinProfile: React.FC<{ user: User | undefined }> = ({ user }) => {
  if (user) {
    return (
      <div className="profile-preview">
        <img src={user.profile_img} alt="profilepicture" />
        <div className="about">
          <h4>{user.name}</h4>
          <p>{user.bio ? user.bio : ''}</p>
          <p>{user.username}</p>
        </div>
      </div>
    );
  } else return <></>;
};

interface NavLinkProps {
  to: string;
  label: string;
}
const NavLink: React.FC<NavLinkProps> = ({ to, label }) => {
  const history = useHistory();

  const [currentpath, setCurrentpath] = useState<string>('/home');

  useEffect(() => {
    setCurrentpath(history.location.pathname);
    history.listen(({ pathname }) => setCurrentpath(pathname));
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
