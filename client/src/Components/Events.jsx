import React from "react";
import { BrowserRouter as Router, useHistory, Route } from "react-router-dom";

import "./css/Events.css";

export default function Events() {
  return (
    <Router>
      <Route path="/events" exact={true}>
        <div className="events">
          <div className="this-week">
            <EventMain />
          </div>
          <AllEvents />
        </div>
      </Route>
      <Route path="/events/view">
        <EventView />
      </Route>
    </Router>
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

        <a className="register-btn" >
          <span>Register</span>
        </a>
      </div>
    </div>
  );
}

function AllEvents() {
  const test = Array.from({ length: 10 });
  return <div className="all-events">{test.map((e,i)=><Event key={i}/>)}</div>;
}

function Event() {
  const history = useHistory();

  const event = { title: "test title" };
  return (
    <div
      className="event"
      onClick={() => {
        history.push({ pathname: "events/view", data: event });
      }}
    >
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
        <span className="date-time">3rd Jan 2020</span>
      </div>
    </div>
  );
}

function EventView() {
  const history = useHistory();

  const event = history.location.data;
  return (
    <div className="event-view">
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
        </p>
        <span className="date-time">3rd Jan 2020</span>

        <div className="register-btn">
          <span>
            <a href="">Register</a>
          </span>
        </div>
      </div>
    </div>
  );
}
