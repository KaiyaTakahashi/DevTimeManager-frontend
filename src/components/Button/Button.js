import React from "react"
import '../../styles/reusable.css'

const Button = ({ onClick, title, isTapped, colour, isSubmit }) => {
  return (
    <button
      className="custom-button"
      id={colour}
      style={{ backgroundColor: isTapped ? "#3D45BA": ""}}
      onClick={onClick}
      type={ isSubmit ? "submit": "button"}
    >
      {title}
    </button>
  );
};

export default Button;