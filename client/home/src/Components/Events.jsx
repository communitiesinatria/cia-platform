import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import { Footer } from './Home';
import { BrowserRouter as Router, useHistory, Route } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import './css/Events.css';
import { getEvents } from './api';

export default function Events() {
  const [events, setevents] = useState([]);
  // const history = useHistory();
  useEffect(() => {
    getEvents().then((d) => {
      setevents(d);
    });
  }, []);

  return (
    <Router>
      <Route path="/events" exact={true}>
        {events.length ? (
          <div className="events">
            <div className="this-week">
              {events.length ? <EventMain {...events[0]} /> : <></>}
            </div>
            <AllEvents events={events} />
            <Footer />
          </div>
        ) : (
          <Loading />
        )}
      </Route>
      <Route path="/events/view">
        <EventView />
      </Route>
    </Router>
  );
}

function EventMain({ title, desc, register, event_img, date }) {
  return (
    <div className="main-event">
      <div className="event-img">
        <img src={event_img} alt="" />
      </div>

      <div className="nav">
        <IconButton onClick={() => window.history.back()}>
          <KeyboardBackspaceIcon />
        </IconButton>
      </div>
      <div className="about">
        <h1>{title}</h1>
        <p>{desc}</p>
        <span className="date-time">{timeConverter(date)}</span>

        <a
          target="_blank"
          href={register}
          className="register-btn"
          rel="noopener noreferrer"
        >
          <span>Register</span>
        </a>
      </div>
    </div>
  );
}

function AllEvents({ events }) {
  // const test = Array.from({ length: 10 });
  return (
    <div className="all-events">
      {events.map((e, i) => (
        <Event event={e} key={i} />
      ))}
      {/* {events.map((e, i) => (
        <Event event={e} key={i} />
      ))} */}
    </div>
  );
}

function Event({ event }) {
  const date = timeConverter(event.date);
  event.date = date;
  console.log(date);

  const history = useHistory();

  //const event = { title: "test title" };
  return (
    <div
      className="event"
      onClick={() => {
        history.push({ pathname: 'events/view', data: event });
      }}
    >
      <div className="bg-img">
        <img src={event.event_img} alt="eventimage" />
      </div>
      <div className="about">
        <h1>{event.title}</h1>
        <p>{event.desc}</p>
        <span className="date-time">{date}</span>
      </div>
    </div>
  );
}
function timeConverter(date) {
  var a = new Date(date);
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const d = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const time = d + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
  return time;
}

function EventView() {
  const history = useHistory();

  const event = history.location.data;

  return (
    <div className="event-view">
      <div className="event-img">
        <img src={event.event_img} alt="" />
      </div>
      <div className="about">
        <h1>{event.title}</h1>
        <p>{event.desc}</p>
        <span className="date-time">{event.date}</span>

        <div className="register-btn">
          <span>
            <a target="_blank" rel="noopener noreferrer" href={event.register}>
              Register
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
