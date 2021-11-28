import React from "react";
import classnames from "classnames";
import cl from "./MyButton.module.scss";

const MyButton = ({ children, theme, wide, ...props }) => {
  const btnClassNames = classnames(cl.btn, cl[`btn--${theme}`], {
    [cl[`btn--wide`]]: wide,
  });
  return (
    <button {...props} className={btnClassNames}>
      {children}
    </button>
  );
};

export default MyButton;
