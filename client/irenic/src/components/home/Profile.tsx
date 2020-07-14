import React, { useContext } from 'react';

// context
import { GlobalContext } from '../GlobalContext';

interface ProfileProps {}
const Profile: React.FC<ProfileProps> = () => {
  const { user } = useContext(GlobalContext);
  console.log(user);
  return (
    <div className="profile">
      <header>
        <div className="profile-img">
          <img src={user?.profile_img} alt="" />
        </div>
        {user ? (
          <div className="about">
            <h2>{user.name || user.username}</h2>
            <p>{user.email}</p>
            {user.github ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://github.com/${user.github}/`}
              >
                github
              </a>
            ) : (
              <></>
            )}
            {user.instagram ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://instagram.com/${user.instagram}/`}
              >
                instagram
              </a>
            ) : (
              <></>
            )}
            {user.bio ? <p>{user.bio}</p> : <></>}
          </div>
        ) : (
          <></>
        )}
      </header>
    </div>
  );
};

export default Profile;
