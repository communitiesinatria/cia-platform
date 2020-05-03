import React, { useEffect } from 'react';


import './css/App.css'
/* import darklogo from './assets/dark-logo.png';
import lighlogo from './assets/light-logo.png' */

import communitylogo from './assets/community.png';
import aboutimg1 from './assets/recources.png'

function App() {
  useEffect(() => {
    const nav = document.querySelector('.app>nav');
    const h1 = document.querySelector('.app>nav>h1');
    function settext(text) {
      if (h1.textContent !== text) {
        h1.style.opacity = 0;
        setTimeout(() => { h1.textContent = text; h1.style.opacity = 1; }, 200);
      }
    }
    window.onscroll = () => {

      if (window.scrollY > 10) {
        nav.classList.add('nav-shadow');
        settext('CIA')

      } else {
        nav.classList.remove('nav-shadow');
        settext('Communities in Atria');
      }
    }

    return () => window.onscroll = null;

  });
  return (
    <div className="app">
      <nav>
        <h1>Communities in Atria</h1>
        <ul>
          <li>Home</li>
          <li>Events</li>
          <li>Blogs</li>
          <li>Team</li>
        </ul>
      </nav>
      <Header />
      <About />
      <Philosophy />
    </div>
  );
}


function Header() {

  return (
    <header>
      <div className="landing-content">
        <div className="landing-message">
          <h1>The Future of Engineering starts here</h1>
          <p>An open platform for Students to collaborate on engineering problems. To Dream big, design destiny and to be a real Visioneer</p>
        </div>
        <img src={communitylogo} alt="community" />
      </div>
    </header>
  )
}

function About() {

  const messages = [
    {
      title: 'Resources',
      message: 'CIA is the platform that facilitates resources to help your visions become reality. From components to oppournities, CIA is the best way to find the best resource.'
    },
    {
      title: 'For Everyone, Always!',
      message: 'CIA is built for inclusivity. Real engineering is the confluence of art, culture, sports and Technology.'
    },
    {
      title: 'Mentorship',
      message: 'Great ideas need great mentors. From domain experts to product designers, CIA helps realise ideas.'
    },
    {
      title: 'Collaboration',
      message: "CIA's sole mission is to realise Enginnering through collaboration. Great things are always done by a team, never alone."
    },
  ]
  const Message = ({ title, message }) => (
    <div className="message">
      <h1>{title}</h1>
      <p>{message}</p>
    </div>
  )

  return (
    <div className="about">
      <div className="messages">{messages.map((m, i) => <Message key={i} {...m} />)}</div>
      <img src={aboutimg1} alt="resources" />
    </div>
  )
}

function Philosophy() {
  return (
    <div className="philosophy">

    </div>
  );
}


export default App;

