import React, { useEffect } from 'react';
import { useUgh } from 'react-ugh';
import { BrowserRouter as Router, useHistory, Link } from 'react-router-dom';

import communitylogo from '../assets/community.svg';
import aboutimg1 from '../assets/resources.svg';
import philosophyimg from '../assets/philosophy.svg';

import green_cia_logo from '../assets/brand/green-logo.svg';
import black_cia_logo from '../assets/brand/black-logo.svg';
export default function Home() {
  const history = useHistory();
  useEffect(() => {
    const nav = document.querySelector('.app>nav');
    const h1 = document.querySelector('.app>nav>.logo>h1');
    function settext(text) {
      if (h1.textContent !== text) {
        h1.style.opacity = 0;
        setTimeout(() => {
          h1.textContent = text;
          h1.style.opacity = 1;
        }, 200);
      }
    }
    window.onscroll = () => {
      if (window.scrollY > 10) {
        nav.classList.add('nav-shadow');
        settext('CIA');
      } else {
        nav.classList.remove('nav-shadow');
        settext('Communities in Atria');
      }
    };

    return () => (window.onscroll = null);
  });
  const accounts = useUgh({ accounts_button: false });

  useEffect(() => {
    const enableAccounts = (e) => {
      if (e.key === 'a' && e.ctrlKey)
        accounts.accounts_button = !accounts.accounts_button;
    };
    window.addEventListener('keydown', enableAccounts);

    return () => window.removeEventListener('keydown', enableAccounts);
  }, [accounts]);

  return (
    <>
      <nav>
        <div className="logo">
          {/* <img src={black_cia_logo} alt="" /> */}
          <h1>Communities in Atria</h1>
        </div>
        <ul>
          <li onClick={() => history.push({ pathname: '/events' })}>Events</li>
          <li onClick={() => history.push({ pathname: '/team' })}>Team</li>
          {accounts.accounts_button ? (
            <li onClick={() => history.push({ pathname: '/account' })}>
              Account
            </li>
          ) : (
            <></>
          )}
        </ul>
      </nav>
      <Header />
      <About />
      <Philosophy />
      <Footer />
    </>
  );
}

export function Header() {
  return (
    <header>
      <div className="landing-content">
        <div className="landing-message">
          <h1>The Future of Engineering starts here</h1>
          <p>
            An open platform for Students to collaborate on engineering
            problems. To Dream big, design destiny and to be a real Visioneer
          </p>
        </div>
        <img src={communitylogo} alt="community" />
      </div>
    </header>
  );
}
export const Message = ({ title, message }) => (
  <div className="message">
    <h1>{title}</h1>
    <p>{message}</p>
  </div>
);

export function About() {
  const messages = [
    {
      title: 'Resources',
      message:
        'CIA is the platform that facilitates resources to help your visions become reality. From components to oppournities, CIA is the best way to find the best resource.',
    },
    {
      title: 'For Everyone, Always!',
      message:
        'CIA is built for inclusivity. Real engineering is the confluence of art, culture, sports and Technology.',
    },
    {
      title: 'Mentorship',
      message:
        'Great ideas need great mentors. From domain experts to product designers, CIA helps realise ideas.',
    },
    {
      title: 'Collaboration',
      message:
        "CIA's sole mission is to realise Enginnering through collaboration. Great things are always done by a team, never alone.",
    },
  ];

  return (
    <div className="About">
      <div className="messages">
        {messages.map((m, i) => (
          <Message key={i} {...m} />
        ))}
      </div>
      <img src={aboutimg1} alt="resources" />
    </div>
  );
}

export function Philosophy() {
  const messages = [
    {
      title: 'By Students! For Students!',
      message: 'Its designed and run by students for students.',
    },
    {
      title: 'For Everyone',
      message:
        'We belive the future of engineering is the confluence of all domains, CIA is always for students of all domains.',
    },
    {
      title: 'Failure is Celebrated',
      message:
        'You dont need to have the greatest idea, the biggest brains or fancy tech. If you have any idea/interest, CIA will help make that a reality.',
    },
    {
      title: 'Bridge Industry - Education Gap',
      message:
        'It takes many years for the lastest tech to reach academin books, CIA is the platform to explore the lastest trends in Enginnering.',
    },
  ];
  return (
    <div className="philosophy">
      <h1>Philosophy</h1>
      <div>
        <div className="messages">
          {messages.map((m, i) => (
            <Message key={i} {...m} />
          ))}
        </div>
        <img src={philosophyimg} alt="" />
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="stuff">
        <div className="brand-stuff">
          <div className="logo">
            <img src={black_cia_logo} alt="" />
            <h1>Communities in Atria</h1>
          </div>
          <p>Some desc can be here, its just this for now</p>
        </div>

        <div className="contact-stuff">
          <div className="adress">
            <h4>Visit us</h4>
            <a
              href="https://www.google.com/maps/place/Atria+Institute+of+Technology/@13.0325489,77.5899031,17z/data=!3m1!4b1!4m5!3m4!1s0x3bae17bd97727093:0x5135aab8250c1df5!8m2!3d13.0325489!4d77.5920918?hl=en-US"
              target="_blank"
              rel="noopener noreferrer"
            >
              ASKB Campus,
              <br /> 1st Main Rd, Ags Colony,
              <br /> Anandnagar, Hebbal,
              <br /> Bengaluru, Karnataka 560024
            </a>
          </div>
          <div>
            <h4>Mail</h4>
            <a href="mailto:cia@atria.edu">cia@atria.edu</a>
          </div>
        </div>

        <div className="explore-stuff">
          <h4>Explore</h4>
          <Link to="/events">Events</Link>
          <Link to="/team">Team</Link>
        </div>

        <div className="social-stuff">
          <a
            href="https://www.instagram.com/cia_together/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              src="https://img.icons8.com/material-sharp/48/000000/instagram-new.png"
              alt=""
            />
          </a>
          <a
            href="https://www.instagram.com/cia_together/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              src="https://img.icons8.com/material-sharp/48/000000/twitter.png"
              alt=""
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
