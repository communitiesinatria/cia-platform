import React from "react";

import "./css/Events.css";

export default function Events() {
  return (
    <div className="events">
      <div className="this-week">
        <EventMain />
      </div>
    </div>
  );
}

function EventMain() {
  return (
    <div className="event">
      <div className="event-img">
        <img
          src="https://engineering.tamu.edu/student-life/_files/_images/_feature-images/speaker-talk-11Oct2018.jpg"
          alt=""
        />
      </div>
      <div className="about">
        <h1>Event title</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore neque
          blanditiis veritatis repellendus! Veniam, veritatis fugiat
        </p>
        <span className="date-time">3rd Jan 2020</span>

        <div className="register-btn">
          <span>Register</span>
        </div>
        
      </div>
    </div>
  );
}
