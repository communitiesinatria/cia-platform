import React, { createContext, useEffect } from 'react';

export const GlobalContext = createContext({});

export const GlobalContextProvider: React.FC = ({ children }) => {
  
  
    useEffect(() => {}, []);

  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};
