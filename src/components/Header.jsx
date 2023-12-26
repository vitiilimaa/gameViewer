import "../styles/components/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faBars,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { toast } from "react-toastify";
import CustomLink from "./CustomLink";

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
          <CustomLink
            title={
              <>
                <FontAwesomeIcon color="#fff" icon={faGamepad} />
                <span className="text-light">GAME VIEWER</span>
              </>
            }
            addClass="navbar-brand ms-3 d-flex align-items-center column-gap-3"
            route="/"
            onClick={() => setLoadingScreen(true)}
          />
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
                <CustomLink
                  title="INÍCIO"
                  addClass="nav-link active text-light"
                  route="/"
                  onClick={() => setLoadingScreen(true)}
                />
              </li>
              <li className="nav-item">
                <CustomLink
                  title="CATEGORIAS"
                  className="nav-link active text-light"
                  route="/categorias"
                  onClick={() => setLoadingScreen(true)}
                />
              </li>
              <li className="nav-item">
                {!loggedUser?.name ? (
                  <CustomLink
                    title="LOGIN"
                    addClass="nav-link text-light"
                    route="/login"
                    onClick={() => setLoadingScreen(true)}
                  />
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
                        <CustomLink
                          title={
                            <>
                              {" "}
                              <FontAwesomeIcon
                                className="me-3"
                                icon={faDoorOpen}
                              />
                              Sair
                            </>
                          }
                          addClass="dropdown-item"
                          containerStyle={{
                            fontSize: 16,
                          }}
                          route="/"
                          onClick={() => handleClickButton()}
                        />
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
