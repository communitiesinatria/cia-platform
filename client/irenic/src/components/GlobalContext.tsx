import React, { createContext, useState } from 'react';

// Api
// import { checkAuth, login } from './api';
//types
import { User, GlobalContextValue } from './ContextTypes';

export const GlobalContext = createContext<GlobalContextValue>({});

export const GlobalContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();

  /* useEffect(() => {

    checkAuth().then((newuser) => {
      setUser(newuser);
    });
  }, []); */

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};
