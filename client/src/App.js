import React, { useEffect } from 'react';


import './css/App.css'
/* import darklogo from './assets/dark-logo.png';
import lighlogo from './assets/light-logo.png' */

import communitylogo from './assets/community.png'
function App() {
  return (
    <div className="app">
      <Header />
    </div>
  );
}


function Header() {

  useEffect(() => {
    const nav = document.querySelector('header nav')
    window.onscroll = () => {
      if (window.scrollY > 10) {
        nav.classList.add('nav-shadow');
      } else {
        nav.classList.remove('nav-shadow');
      }
    }
  })

  return (
    <header>
      <nav>
        <h1>CIA</h1>
        <ul>
          <li>Home</li>
          <li>Events</li>
          <li>Team</li>
        </ul>
      </nav>
      <div className="landing-content">
        <div className="landing-message">
          <h1>Communities in Atria</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore iusto similique placeat ratione accusantium soluta!</p>
        </div>
        <img src={communitylogo} alt="community" />
      </div>
    </header>
  )
}
export default App;
