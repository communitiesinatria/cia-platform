import React, { useEffect } from 'react';


import './css/App.css'
/* import darklogo from './assets/dark-logo.png';
import lighlogo from './assets/light-logo.png' */

import communitylogo from './assets/community.png';
import aboutimg1 from './assets/resources.png'
import philosophyimg from './assets/philosophy.png'

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
      <Footer />
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
const Message = ({ title, message }) => (
  <div className="message">
    <h1>{title}</h1>
    <p>{message}</p>
  </div>
)

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
  ];


  return (
    <div className="about">
      <div className="messages">{messages.map((m, i) => <Message key={i} {...m} />)}</div>
      <img src={aboutimg1} alt="resources" />
    </div>
  )
}

function Philosophy() {
  const messages = [
    {
      title: 'By Students! For Students!',
      message: 'Its designed and run by students for students.'
    },
    {
      title: 'For Everyone',
      message: 'We belive the future of engineering is the confluence of all domains, CIA is always for students of all domains.'
    },
    {
      title: 'Failure is Celebrated',
      message: 'You dont need to have the greatest idea, the biggest brains or fancy tech. If you have any idea/interest, CIA will help make that a reality.'
    },
    {
      title: 'Bridge Industry - Education Gap',
      message: 'It takes many years for the lastest tech to reach academin books, CIA is the platform to explore the lastest trends in Enginnering.'
    },
  ]
  return (
    <div className="philosophy">
      <h1>Philosophy</h1>
      <div>
        <div className="messages">{messages.map((m, i) => <Message key={i} {...m} />)}</div>
        <img src={philosophyimg} alt="" />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <h1>Contact</h1>
      <p>Mail us at <a href="mailto:cia@atria.edu">cia@atria.edu</a></p>
      <p id="phone">call us at <a href="tel:+62896706255135">+91 94888 44242</a></p>
      <p>DM us at <a href="https://www.instagram.com/cia_together/" target="_blank">@cia_together</a></p>
      <p>Visit us at  <br />
        <a href="https://www.google.com/maps/place/Atria+Institute+of+Technology/@13.0325489,77.5899031,17z/data=!3m1!4b1!4m5!3m4!1s0x3bae17bd97727093:0x5135aab8250c1df5!8m2!3d13.0325489!4d77.5920918?hl=en-US" target="_blank">
          ASKB Campus,<br /> 1st Main Rd, Ags Colony,<br /> Anandnagar, Hebbal,<br /> Bengaluru, Karnataka 560024
        </a>
      </p>
    </footer>
  )
}

export default App;

