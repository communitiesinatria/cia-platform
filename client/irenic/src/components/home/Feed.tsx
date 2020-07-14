import React, { useContext, useRef, useState } from 'react';

import { GlobalContext } from '../GlobalContext';
const Feed: React.FC = () => {
  const { user } = useContext(GlobalContext);
  return (
    <div className="feed">
      <header>
        <h3>Home</h3>
      </header>
      <CreatePost profile_img={user?.profile_img} />
      <Posts />
    </div>
  );
};

interface PostsProps {}
const Posts: React.FC<PostsProps> = () => {
  const [posts, setPosts] = useState([]);

  return (
    <div className="posts">
      {!posts.length ? (
        <div className="no-posts">
          <img
            src="https://img.icons8.com/material-sharp/24/000000/activity-feed-2.png"
            alt=""
          />
          <span>No Posts yet</span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

interface CreatePostProps {
  profile_img: string | undefined;
}
const CreatePost: React.FC<CreatePostProps> = ({ profile_img }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [charcount, setCharcount] = useState(0);
  const onchange = () => {
    if (textareaRef.current) {
      // adjust height of textarea
      textareaRef.current.style.height = '0px';
      textareaRef.current.style.height =
        25 + textareaRef.current.scrollHeight + 'px';

      textareaRef.current.value = textareaRef.current.value.trimStart();
      if (textareaRef.current.value.length <= 255) {
        setCharcount(textareaRef.current.value.length);
      } else {
      }
    }
  };

  return (
    <div className="create-post">
      <form>
        <img src={profile_img} alt="profile_img" />
        <div className="compose">
          <textarea
            maxLength={255}
            ref={textareaRef}
            onChange={onchange}
            placeholder="what's going on?"
          />
        </div>
      </form>
      <p>{charcount >= 10 ? charcount : <></>}</p>

      <button className={!(charcount > 10) ? 'disabled-post' : ''}>Post</button>
    </div>
  );
};

export default Feed;
