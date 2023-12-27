import "../styles/pages/NotFound.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { LoadingContext } from "../contexts/LoadingContext";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const { setLoadingScreen } = useContext(LoadingContext);
  const navigate = useNavigate();

  const handleClickButton = () => {
    setLoadingScreen(true);
    navigate("/");
  };

  return (
    <div className="notfound-container">
      <h1 className="normal-text text-center px-3">
        A PÁGINA QUE VOCÊ TENTOU ACESSAR NÃO EXISTE =/
      </h1>
      <Link
        className="mt-4 btn text-light fw-normal"
        onClick={() => handleClickButton()}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="me-3" />
        VOLTAR AO INÍCIO
      </Link>
    </div>
  );
};

export default NotFound;
