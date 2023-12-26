import "../styles/components/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faBars,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { toast } from "react-toastify";

const Header = () => {
  const { loggedUser, setLoggedUser } = useContext(UserContext);

  const handleClickButton = () => {
    localStorage.removeItem("user");
    setLoggedUser({});
    toast.success("Você saiu da sua sessão com sucesso.");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid px-0 px-sm-5">
          <Link
            className="navbar-brand ms-3 d-flex align-items-center column-gap-3"
            to="/"
          >
            <FontAwesomeIcon color="#fff" icon={faGamepad} />
            <span className="text-light">GAME VIEWER</span>
          </Link>
          <button
            className="navbar-toggler me-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FontAwesomeIcon color="#fff" icon={faBars} />
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav column-gap-4">
              <li className="nav-item">
                <Link
                  className="nav-link active text-light"
                  aria-current="page"
                  to="/"
                >
                  INÍCIO
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active text-light"
                  aria-current="page"
                  to="/categorias"
                >
                  CATEGORIAS
                </Link>
              </li>
              <li className="nav-item">
                {!loggedUser?.name ? (
                  <Link className="nav-link text-light" to="/login">
                    LOGIN
                  </Link>
                ) : (
                  <div className="dropdown">
                    <a
                      className="dropdown-toggle normal-text text-light"
                      href="#"
                      role="button"
                      style={{
                        fontSize: 16,
                      }}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {loggedUser.name?.toUpperCase()}{" "}
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark">
                      <li className="normal-text">
                        <Link
                          className="dropdown-item"
                          style={{
                            fontSize: 16,
                          }}
                          to="/"
                          onClick={() => handleClickButton()}
                        >
                          <FontAwesomeIcon className="me-3" icon={faDoorOpen} />
                          Sair
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
