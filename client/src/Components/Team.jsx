import React from "react";

//styles
import "./css/Teams.css";

//assets
import headerImage from "../assets/team.png";
//team member photos
import rajImg from "../assets/teams/raj.jpg";

export default function Team() {
  return (
    <div className="team">
      <header>
        <div className="bg-img">
          <img src={headerImage} alt="" />
        </div>
        <h1>Our Team</h1>
      </header>
      <MemberGrid />
    </div>
  );
}

function MemberGrid() {
  return (
    <div className="members">
      <Member />
      <Member />
      <Member />
      <Member />
      <Member />
    </div>
  );
}

function Member() {
  return (
    <div className="member">
      <div className="profile-img">
        <img src={rajImg} alt="raj" />
      </div>
      <div className="about">
        <h3>Raj Sharma</h3>
        <p>some role</p>
      </div>
      <div className="contact">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://instagram.com/xrehpicx"
        >
          instagram
        </a>
      </div>
    </div>
  );
}
