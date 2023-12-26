import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { LoadingContext } from "../contexts/LoadingContext";

const CustomLink = ({ title, route, children, containerStyle, addClass }) => {
  const navigate = useNavigate();
  const { setLoadingScreen } = useContext(LoadingContext);

  return (
    <Link
      style={containerStyle}
      className={addClass || ""}
      onClick={() => {
        setLoadingScreen(true);
        setTimeout(() => navigate(route), 1000);
      }}
    >
      {title}
    </Link>
  );
};

export default CustomLink;
