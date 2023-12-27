import "../styles/components/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faBars,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { LoadingContext } from "../contexts/LoadingContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { loggedUser, setLoggedUser } = useContext(UserContext);
  const { setLoadingScreen } = useContext(LoadingContext);
  const navigate = useNavigate();

  const accessRoute = (route) => {
    setLoadingScreen(true);
    setTimeout(() => navigate(route), 1000);
  };

  const handleExitLink = () => {
    setLoadingScreen(true);
    setTimeout(() => {
      localStorage.removeItem("user");
      setLoggedUser({});
      navigate("/");
      toast.success("Você saiu da sua sessão com sucesso.");
    }, 1000);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid px-0 px-sm-5">
          <Link
            className="navbar-brand ms-3 d-flex align-items-center column-gap-3"
            onClick={() => accessRoute("/")}
          >
            {" "}
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
                  onClick={() => accessRoute("/")}
                >
                  INÍCIO
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active text-light"
                  onClick={() => accessRoute("/categorias")}
                >
                  CATEGORIAS
                </Link>
              </li>
              <li className="nav-item">
                {!loggedUser?.name ? (
                  <Link
                    className="nav-link text-light"
                    onClick={() => accessRoute("/login")}
                  >
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
                          style={{ fontSize: 16 }}
                          onClick={() => handleExitLink()}
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
