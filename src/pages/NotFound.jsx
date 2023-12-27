import "../styles/pages/NotFound.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { LoadingContext } from "../contexts/LoadingContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../components";

const NotFound = () => {
  const { setLoadingScreen } = useContext(LoadingContext);
  const navigate = useNavigate();

  const handleClickButton = () => {
    setLoadingScreen(true);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="notfound-container">
      <h1 className="normal-text text-center px-3">
        A PÁGINA QUE VOCÊ TENTOU ACESSAR NÃO EXISTE =/
      </h1>
      <Button
        title={"VOLTAR AO INÍCIO"}
        icon={<FontAwesomeIcon icon={faArrowLeft} className="me-3" />}
        addClassContainer="mt-4 fw-normal"
        addClassTextButton="text-light"
        onClick={() => handleClickButton()}
      />
    </div>
  );
};

export default NotFound;
