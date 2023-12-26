import "../styles/pages/Login.css";
import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Button, TextInput } from "../components";
import validateFields from "../helpers/validateFields";
import getUser from "../services/getUser";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { loggedUser, setLoggedUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    email: {
      value: "",
      onError: null,
      errorMessage: "",
    },
    password: {
      value: "",
      onError: null,
      errorMessage: "",
    },
  });

  const fieldsValidation = (field, newValue) => {
    const { existError, message } = validateFields(field, newValue);

    setFields((prevState) => ({
      ...prevState,
      [field]: {
        value: newValue,
        onError: existError,
        errorMessage: message,
      },
    }));
  };

  const handleClickButton = async (e) => {
    e.preventDefault();

    if (fields.email.onError === false && fields.password.onError === false) {
      setIsLoading(true);
      setTimeout(async () => {
        const userData = await getUser(fields);
        Object.keys(fields).map((field) =>
          setFields((prevState) => ({
            ...prevState,
            [field]: {
              value: "",
            },
          }))
        );
        setIsLoading(false);
        setLoggedUser(userData);
        navigate("/");
      }, 2000);
    } else {
      Object.keys(fields).map((field) => {
        fieldsValidation(field, fields[field].value);
      });
    }
  };

  return (
    <div className="login-container flex-column justify-content-center px-4 py-5">
      {!loggedUser?.name ? (
        <form className="form-login-container d-flex flex-column justify-content-center">
          <div className="d-flex justify-content-center align-items-center flex-wrap">
            <p className="fw-bold w-100 text-center fs-4">BEM-VINDO(A) </p>
            <FontAwesomeIcon fontSize={56} icon={faGamepad} />
          </div>
          <TextInput
            id="email"
            title="E-mail"
            value={fields.email.value}
            addClassToContainer="mt-5"
            isValidate={!fields.email.onError}
            errorMessage={fields.email.errorMessage}
            onChangeValue={(newValue) => fieldsValidation("email", newValue)}
          />
          <TextInput
            id="password"
            type="password"
            title="Senha"
            addClassToContainer="mt-4"
            value={fields.password.value}
            isValidate={!fields.password.onError}
            errorMessage={fields.password.errorMessage}
            onChangeValue={(newValue) => fieldsValidation("password", newValue)}
          />
          <Button
            title="ENTRAR"
            type="submit"
            onClick={(e) => handleClickButton(e)}
            isLoading={isLoading}
            fontSize={16}
            addClassButton="w-100"
            addClassContainer="mt-5"
          />
        </form>
      ) : (
        <>
          <h1 className="normal-text text-center px-3">
            VOCÊ JÁ ESTÁ LOGADO.
          </h1>
          <Link className="mt-4 btn text-light fw-normal" to="/">
            <FontAwesomeIcon icon={faArrowLeft} className="me-3" />
            VOLTAR AO INÍCIO
          </Link>
        </>
      )}
    </div>
  );
};

export default Login;
