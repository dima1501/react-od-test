import React from "react";
import classes from "./MyRadio.module.scss";

const MyRadio = (props) => {
  return (
    <div className={classes["MyRadio"]}>
      <input
        className={classes["MyRadio__input"]}
        type="radio"
        checked={props.checked}
        value={props.value}
        name={props.name}
        id={props.id}
        onChange={props.onChange}
      />
      <label htmlFor={props.id} className={classes["MyRadio__label"]}>
        {props.label}
      </label>
    </div>
  );
};

export default MyRadio;
