import React from "react";

const Button = ({ title, icon, styles, onClick }) => {
  return (
    <button
      title={title}
      onClick={onClick}
      className={` ${
        styles
          ? styles
          : "flex flex-row gap-1 items-center px-4 py-1 rounded-md"
      } hover:opacity-70`}
    >
      {icon && icon}
      <p className="font-semibold capitalize"> {title && title}</p>
    </button>
  );
};

export default Button;
