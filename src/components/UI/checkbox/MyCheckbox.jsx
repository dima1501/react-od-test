import React from "react";
import classes from "./MyCheckbox.module.scss";

const MyCheckbox = ({ item, onChange, disabled }) => {
  return (
    <div className={classes["MyCheckbox"]}>
      <input
        disabled={disabled}
        className={classes["MyCheckbox__input"]}
        checked={item.checked}
        type="checkbox"
        name={item.id}
        id={item.id}
        onChange={onChange}
      />
      <label htmlFor={item.id} className={classes["MyCheckbox__label"]}></label>
    </div>
  );
};

export default MyCheckbox;
