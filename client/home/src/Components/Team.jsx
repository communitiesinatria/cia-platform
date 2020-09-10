import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import { Footer } from './Home';

import IconButton from '@material-ui/core/IconButton';
//styles
import './css/Teams.css';

//assets
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import headerImage from '../assets/team.svg';

//team member photos
import { getMembers } from './api';

export default function Team() {
  const [members, setmembers] = useState([]);
  useEffect(() => {
    getMembers().then((d) => {
      // console.log(d);
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

  console.log(members.length);

  return (
    <>
      {members.length ? (
        <div className="team">
          <header>
            <div className="bg-img">
              <img src={headerImage} alt="" />
            </div>
            <h1>Our Team</h1>
          </header>
          <div className="back-btn">
            <IconButton onClick={() => (window.location.pathname = '/')}>
              <KeyboardBackspaceIcon />
            </IconButton>
          </div>
          <MemberGrid members={members} />
          <Footer />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

function MemberGrid({ members }) {
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
        <p>{role === 'admin' ? 'core' : 'role'}</p>
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
