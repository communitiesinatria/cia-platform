import React from "react";

import "./css/Events.css";

export default function Events() {
  return (
    <div className="events">
      <div className="this-week">
        <EventMain />
      </div>
      <AllEvents />
    </div>
  );
}

function EventMain() {
  return (
    <div className="main-event">
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
          blanditiis veritatis repellendus! Veniam, veritatis fugiat Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Tempore neque blanditiis
          veritatis repellendus! Veniam, veritatis fugiat Lorem ipsum dolor sit
        </p>
        <span className="date-time">3rd Jan 2020</span>

        <div className="register-btn">
          <span>Register</span>
        </div>
      </div>
    </div>
  );
}

function AllEvents() {
  return (
    <div className="all-events">
      <Event />
      <Event />
      <Event />
      <Event />
      <Event />
      <Event />
      <Event />
      <Event />
      <Event />
      <Event />
      <Event />
      <Event />
    </div>
  );
}

function Event() {
  return (
    <div className="event">
      <div className="bg-img">
        <img
          src="https://total-event.com/wp-content/uploads/2018/01/event-planning-microsoft-ignite.jpg"
          alt="eventimage"
        />
      </div>
      <div className="about">
        <h1>title</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia laborum
        </p>
      </div>
    </div>
  );
}
