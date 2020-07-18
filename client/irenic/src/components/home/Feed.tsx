import React, { useContext, useRef, useState, useEffect } from 'react';

import { GlobalContext } from '../GlobalContext';

//api
import { post, getPosts } from '../api';
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
type Post = {
  message: string;
  created_by: {
    username: string;
    profile_img?: string;
  };
  created_at: number;
  vote?: {
    up: number;
    down: number;
  };
};
const Posts: React.FC<PostsProps> = () => {
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    document.title = 'irenic | Home';
    getPosts().then((ps) => {
      console.log(ps);
      setPosts(ps);
    });
  }, []);

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
        posts.map((post, i) => {
          return <Post key={i} {...post} />;
        })
      )}
    </div>
  );
};

const Post: React.FC<Post> = ({
  message,
  created_at,
  created_by,
  children,
  vote,
}) => {
  return (
    <div className="post">
      <div className="post-body">
        <img src={created_by.profile_img} alt="img" />
        <div className="message">
          <h4>{created_by.username}</h4>
          <p>{message}</p>
        </div>
      </div>
      <div className="post-actions">
        <div className="vote" id="positive">
          <img
            src="https://img.icons8.com/windows/24/000000/plus-math.png"
            alt=""
          />
        </div>
        <div className="vote" id="negative">
          <img
            src="https://img.icons8.com/material-two-tone/24/000000/minus--v1.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

interface CreatePostProps {
  profile_img: string | undefined;
}
const CreatePost: React.FC<CreatePostProps> = ({ profile_img }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [charcount, setCharcount] = useState(0);
  const { user } = useContext(GlobalContext);
  const postPost = async () => {
    if (
      charcount >= 10 &&
      textareaRef.current &&
      textareaRef.current.value &&
      user
    ) {
      const newpost = {
        message: textareaRef.current.value.trim(),
        created_by: {
          username: user.username,
          profile_img: user.profile_img,
        },
        created_at: Date.now(),
      };
      const poststatus = await post(newpost);
      if (poststatus) {
        textareaRef.current.value = '';
        onchange();
      }
    }
  };

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

      <button
        onClick={postPost}
        className={!(charcount >= 10) ? 'disabled-post' : ''}
      >
        Post
      </button>
    </div>
  );
};

export default Feed;
