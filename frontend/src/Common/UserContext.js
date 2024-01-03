import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => {
  const userContext = useContext(UserContext);
  if (userContext) {
    return userContext;
  }
  return { user: null, setLoginUser: null };
};

export const UserProvider = ({ children }) => {
  const [user, setLoginUser] = useState(null);

  const value = {
    user,
    setLoginUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
