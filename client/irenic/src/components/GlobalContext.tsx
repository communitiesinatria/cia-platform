import React, { createContext, useEffect, useState } from 'react';

// Api
import { checkAuth } from './api';
//types
import { User, GlobalContextValue } from './ContextTypes';

export const GlobalContext = createContext<GlobalContextValue>({});

export const GlobalContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    checkAuth().then((newuser) => {
      setUser(newuser);
    });
  }, []);

  return (
    <GlobalContext.Provider value={{ user }}>{children}</GlobalContext.Provider>
  );
};
