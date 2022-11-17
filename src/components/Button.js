import React from "react"
import "/Users/kaiyatakahashi/Desktop/DevTimeManager/client/src/styles/components.css"

const Button = ({ onClick, showClicked, prompt, id }) => {
  return (
    <button
      id={id}
      className="button"
      onClick={onClick}
    >
      {showClicked ? "Unlike" : prompt}
    </button>
  );
};

export default Button;