import React from "react";
import classes from "./MyInput.module.scss";

const MyInput = (props) => {
  return (
    <div className={classes["MyInput-wrapper"]}>
      <input {...props} className={classes.MyInput} />
      {!!props.value.length && props.suffix && (
        <div suffix={props.suffix} className={classes["MyInput-suffix"]}>
          {props.value}{" "}
        </div>
      )}
    </div>
  );
};

export default MyInput;
