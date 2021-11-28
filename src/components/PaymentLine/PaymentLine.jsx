import React, { useMemo } from "react";
import classes from "./PaymentLine.module.scss";

import MyCheckbox from "../UI/checkbox/MyCheckbox";
import { formatCurrency } from "../../utils/formatCurrency";

const PaymentLine = ({ item, onChange, index }) => {
  const ending = useMemo(() => {
    const value = index + 1;
    switch (true) {
      case value === 1:
        return "ый";
      case value === 2:
        return "ой";
      case value === 3:
        return "ий";
      case value > 3 && value < 6:
        return "ый";
      case value > 5 && value < 9:
        return "ой";
      case value > 8 && value < 22:
        return "ый";
      default:
        return "й";
    }
  }, [index]);

  const formattedValue = useMemo(() => {
    return formatCurrency(item.value);
  }, [item.value]);

  return (
    <div className={classes["PaymentLine"]}>
      <div className={classes["PaymentLine__checkbox"]}>
        <MyCheckbox item={item} onChange={(e) => onChange(e, item)} />
      </div>
      <div className={classes["PaymentLine__descr"]}>
        {formattedValue} рублей{" "}
        <span>
          {" "}
          в {index + 1}-{ending} год
        </span>
      </div>
    </div>
  );
};

export default PaymentLine;
