import "../styles/pages/Login.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { Button, TextInput } from "../components";
import validateFields from "../helpers/validateFields";
import getUser from "../services/getUser";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { setLoggedUser } = useContext(UserContext);

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
      const correctUser = await getUser(fields);
      console.log(correctUser);
      setTimeout(() => {
        if (correctUser) {
          Object.keys(fields).map((field) =>
            setFields((prevState) => ({
              ...prevState,
              [field]: {
                value: "",
              },
            }))
          );
          navigate("/");
          setLoggedUser(correctUser);
          toast.success("Login efetuado com sucesso!");
        } else {
          toast.error("Email e/ou senha incorretos!");
        }
        setIsLoading(false);
      }, 2000);
    } else {
      Object.keys(fields).map((field) => {
        fieldsValidation(field, fields[field].value);
      });
    }
  };

  return (
    <div className="login-container justify-content-center px-4">
      <form className="form-login-container">
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
    </div>
  );
};

export default Login;
