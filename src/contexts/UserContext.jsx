import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState({});

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const sharedData = {
    loggedUser,
    setLoggedUser,
  };

  return (
    <UserContext.Provider value={sharedData}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
