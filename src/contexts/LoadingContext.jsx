import { createContext, useState } from "react";

const LoadingContext = createContext();

const LoadingContextProvider = ({ children }) => {
  const [loadingScreen, setLoadingScreen] = useState(true);

  const sharedData = {
    loadingScreen,
    setLoadingScreen,
  };

  return (
    <LoadingContext.Provider value={sharedData}>
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingContextProvider };
