import React from 'react'

import './css/Events.css'



export default function Events() {

    return (
        <div className="events">
            <h1>Events</h1>
            <div className="this-week">
                <h2>This Week</h2>
                <Event />
            </div>
        </div>
    )
}

function Event() {
    return (
        <div className="event">
            <div className="about">
                <h1>Event title</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore neque blanditiis veritatis repellendus! Veniam, veritatis fugiat</p>
                <span className="date-time">Tomorrow</span>
            </div>
            <div className="event-img">
                <img src="https://engineering.tamu.edu/student-life/_files/_images/_feature-images/speaker-talk-11Oct2018.jpg" alt="" />
            </div>
        </div>
    )
}