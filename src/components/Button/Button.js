import React from "react"
import '../../styles/reusable.css'

const Button = ({ onClick, title }) => {
  return (
    <button
      className="custom-button"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;