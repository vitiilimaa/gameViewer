import "../styles/components/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Header = () => {
  const { loggedUser } = useContext(UserContext);

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
                {!loggedUser ? (
                  <Link className="nav-link text-light" to="/login">
                    LOGIN
                  </Link>
                ) : (
                  <Link className="nav-link text-light" to="/categorias">
                    {loggedUser.name.toUpperCase()}
                  </Link>
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
