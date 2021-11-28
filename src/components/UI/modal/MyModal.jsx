import React from "react";
import classes from "./MyModal.module.scss";

const MyModal = ({ children, visible, setVisible }) => {
  const rootClasses = [classes.MyModal];

  if (visible) {
    rootClasses.push(classes.active);
  }

  return (
    <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
      <div
        className={classes["MyModal__content"]}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className={classes["MyModal__closer"]}
          onClick={() => setVisible(false)}
        ></div>
        {children}
      </div>
    </div>
  );
};

export default MyModal;
