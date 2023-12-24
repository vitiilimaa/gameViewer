import { useState } from "react";
import "../styles/components/Button.css";

const Button = (
  {
    title,
    onClick,
    onShadow,
    type = "button",
    isLoading,
    buttonTextStyle,
    buttonHoverStyle,
    buttonStyle,
    containerStyle,
    addClassButton = "",
    addClassTextButton = "",
    addClassContainer = "",
    fontSize,
  }
) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ ...containerStyle }} className={`${addClassContainer}`}>
      <button
        type={type}
        style={{
          boxShadow: `${onShadow ? "0 0 5px #000" : ""}`,
          ...(isHovered && buttonHoverStyle),
          ...buttonStyle,
        }}
        className={`btn ${addClassButton}`}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span
          style={{ ...buttonTextStyle, fontSize }}
          className={`btn-text ${addClassTextButton}`}
        >
          {isLoading ? (
            <div className="spinner-border text-light loading" />
          ) : (
            title
          )}
        </span>
      </button>
    </div>
  );
};

export default Button;
