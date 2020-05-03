import React, { useEffect } from 'react';


import './css/App.css'
/* import darklogo from './assets/dark-logo.png';
import lighlogo from './assets/light-logo.png' */

import communitylogo from './assets/community.png'
function App() {

  useEffect(() => {
    window.cursorDom = document.querySelector('.cursor');
    window.addEventListener('mousemove', cursor)
  })

  return (
    <>
      <div className="cursor"></div>
      <div className="app">
        <Header />
      </div>
    </>
  );
}


function Header() {

  useEffect(() => {
    const nav = document.querySelector('header nav')
    window.onscroll = () => {
      const h1 = document.querySelector('header nav h1');
      if (window.scrollY > 10) {
        h1.style.opacity = 0;
        setTimeout(() => {
          h1.textContent = 'CIA'
          h1.style.opacity = 1;
        },300)
        nav.classList.add('nav-shadow');
      } else {
        h1.style.opacity = 0;
        setTimeout(() => {
          h1.textContent = 'Communities in Atria'
          h1.style.opacity = 1;
        }, 300)
        nav.classList.remove('nav-shadow');
      }
    }

  })

  return (
    <header>
      <nav>
        <h1>Communities in Atria</h1>
        <ul>
          <li>Home</li>
          <li>Events</li>
          <li>Team</li>
        </ul>
      </nav>
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



export default App;

function cursor(e) {
  window.cursorDom.style.top = e.pageY + 'px'
  window.cursorDom.style.left = e.pageX + 'px'
}