import React from "react";

function Button({ children, className, type = "button", ...otherProps }) {
  return (
    <button
      className={`px-6 py-2 text-white bg-blue-500  rounded-sm hover:brightness-95 ${className}`}
      type={type}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default Button;
