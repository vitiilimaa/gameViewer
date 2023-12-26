import "../styles/pages/NotFound.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1 className="normal-text text-center px-3">
        A PÁGINA QUE VOCÊ TENTOU ACESSAR NÃO EXISTE =/
      </h1>
      <Link className="mt-4 btn text-light fw-normal" to="/">
        <FontAwesomeIcon icon={faArrowLeft} className="me-3" />
        VOLTAR AO INÍCIO
      </Link>
    </div>
  );
};

export default NotFound;
