import "../styles/components/TextInput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

const TextInput = ({
  id,
  title,
  type,
  value,
  onChangeValue,
  isValidate,
  errorMessage,
  addClassToContainer = "",
}) => {
  const [typeInput, setTypeInput] = useState(type);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickIconPassword = () => {
    setTypeInput((prevState) =>
      prevState === "password" ? "text" : "password"
    );
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={`form-floating ${addClassToContainer}`}>
      {type?.toUpperCase() === "MEMO" ? (
        <>
          <textarea
            className={`form-control ${
              isValidate === false ? "is-invalid" : ""
            }`}
            placeholder={title}
            name={id}
            id={id}
            value={value}
            onChange={(e) => onChangeValue(e.target.value)}
            cols={30}
            rows={10}
            style={{ height: 200, resize: "none" }}
            autoComplete="off"
          />
          <div className="invalid-feedback">{errorMessage}</div>
        </>
      ) : (
        <>
          <input
            className={`form-control ${
              isValidate === false ? "is-invalid" : ""
            }`}
            placeholder={title}
            name={id}
            id={id}
            type={typeInput ? typeInput : "text"}
            value={value}
            onChange={(e) => onChangeValue(e.target.value)}
            autoComplete="off"
          />
          {type === "password" && isValidate && (
            <FontAwesomeIcon
              id="icon-password"
              icon={showPassword ? faEyeSlash : faEye}
              style={typeInput === "text" ? { width: 24, height: 24, right: 18 } : null}
              onClick={() => handleClickIconPassword()}
            />
          )}
          <div className="invalid-feedback">{errorMessage}</div>
        </>
      )}
      <label htmlFor={id}>{title}</label>
    </div>
  );
};

export default TextInput;
