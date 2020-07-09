import React, { useEffect, useState } from 'react';

//styles
import './css/Teams.css';

//assets
import headerImage from '../assets/team.png';

//team member photos
import rajImg from '../assets/teams/raj.jpg';
import { getMembers } from './api';

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
  const [members, setmembers] = useState([]);
  useEffect(() => {
    getMembers().then((d) => {
      console.log(d);
      setmembers(d);
    });

    const members = document.querySelectorAll('.member');

    members.forEach((member) => {
      member.addEventListener('mouseover', () => {
        member.scrollIntoView();
      });
    });

    return () => {
      members.forEach((member) => {
        member.removeEventListener('mouseover', () => {});
      });
    };
  }, []);

  return (
    <div className="members">
      {members.map((member, i) => (
        <Member key={i} {...member} />
      ))}
    </div>
  );
}

function Member({
  name,
  email,
  github,
  instagram,
  profile_img,
  role,
  username,
}) {
  return (
    <div className="member">
      <div className="profile-img">
        <img src={profile_img} alt="raj" />
      </div>
      <div className="about">
        <h3>{name ? name : username}</h3>
        <p>{role}</p>
      </div>
      <div className="contact">
        {instagram ? (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={'https://instagram.com/' + instagram}
          >
            instagram
          </a>
        ) : (
          <></>
        )}
        {github ? (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={'https://github.com/' + github}
          >
            github
          </a>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
