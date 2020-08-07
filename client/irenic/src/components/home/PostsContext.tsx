import React, { createContext, useState, useEffect, useCallback } from 'react';
import { Post } from '../ContextTypes';
import { getPosts } from '../api';

// Api
// import { checkAuth, login } from './api';
//types
interface PostContextProps {
  posts: Array<Post>;
  updatePosts?: () => void;
}

export const PostsContext = createContext<PostContextProps>({
  posts: [],
});

export const PostsContextProvider: React.FC = ({ children }) => {
  const [posts, setPosts] = useState<Array<Post>>([]);
  const updatePosts = useCallback(() => {
    getPosts().then((ps) => setPosts(ps.reverse()));
  }, []);

  useEffect(updatePosts, [updatePosts]);

  return (
    <PostsContext.Provider value={{ posts, updatePosts }}>
      {children}
    </PostsContext.Provider>
  );
};
