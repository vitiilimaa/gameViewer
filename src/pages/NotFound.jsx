import "../styles/pages/NotFound.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { LoadingContext } from "../contexts/LoadingContext";
import { CustomLink } from "../components";

const NotFound = () => {
  const { setLoadingScreen } = useContext(LoadingContext);

  return (
    <div className="notfound-container">
      <h1 className="normal-text text-center px-3">
        A PÁGINA QUE VOCÊ TENTOU ACESSAR NÃO EXISTE =/
      </h1>
      <CustomLink
        title={
          <>
            {" "}
            <FontAwesomeIcon icon={faArrowLeft} className="me-3" />
            VOLTAR AO INÍCIO
          </>
        }
        addClass="mt-4 btn text-light fw-normal"
        route="/"
        onClick={() => setLoadingScreen(true)}
      />
    </div>
  );
};

export default NotFound;
