import { createContext } from "react";
import { useState } from "react";

const UserContext = createContext()

const UserContextProvider = ({children}) => {
  const [loggedUser, setLoggedUser] = useState()

  const user = {
    loggedUser, setLoggedUser
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export { UserContext, UserContextProvider }