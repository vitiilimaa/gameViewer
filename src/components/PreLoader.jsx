import "../styles/components/PreLoader.css";
import { Spinner } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { LoadingContext } from "../contexts/LoadingContext";

const PreLoader = () => {
  const { loadingScreen, setLoadingScreen } = useContext(LoadingContext);

  useEffect(() => {
    if (loadingScreen) {
      document.documentElement.style.overflow = "hidden";
      document.documentElement.scrollTop = 0;
      setTimeout(() => {
        setLoadingScreen(false);
        document.documentElement.style.overflow = "initial";
      }, 1000);
    }
  }, [loadingScreen]);

  return (
    <div className={`preloader-container ${!loadingScreen && "hide"}`}>
      <Spinner className="preloader-spinner" />
    </div>
  );
};

export default PreLoader;
