import React, { useState, useEffect } from "react";

import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";
import MyRadio from "../UI/radio/MyRadio";

import PaymentLine from "../PaymentLine/PaymentLine";

import classnames from "classnames";
import cl from "./TaxForm.module.scss";

const TaxForm = ({ setModal }) => {
  const [salary, setSalary] = useState("");
  const [error, setError] = useState(null);
  const [payments, setPayments] = useState([]);
  const [type, setType] = useState("payment");

  const [estateCost] = useState(5000000);

  useEffect(() => {
    if (salary) {
      const deductionValue = estateCost > 2000000 ? 260000 : estateCost * 0.13;
      const maxYearValue = (salary * 12 * 0.13).toFixed(2);
      const paymentsCount = Math.ceil(deductionValue / maxYearValue);
      const lastPayment = (deductionValue % maxYearValue).toFixed(2);

      // Ограничил до 200 лет :)
      const paymentsArray = Array.from(
        { length: paymentsCount > 200 ? 200 : paymentsCount },
        (x, i) => {
          return {
            id: Math.random().toString(36).substr(2, 10),
            value: i + 1 !== paymentsCount ? maxYearValue : lastPayment,
            checked: false,
          };
        }
      );
      setPayments(paymentsArray);
    } else {
      setPayments([]);
    }
  }, [salary, estateCost]);

  const handleCheckboxChange = (e, item) => {
    const index = payments.indexOf(item);
    const paymentsArray = payments.slice();

    if (e.target.checked) {
      paymentsArray[index].checked = true;
    } else {
      paymentsArray[index].checked = false;
    }

    setPayments(paymentsArray);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Доход в месяц: ${salary}`);
    console.log(payments.filter((p) => p.checked));
    console.log(`Уменьшаем ${type === "payment" ? "платеж" : "срок"}`);
    setModal(false);
  };

  const handleSalaryChange = (event) => {
    const value = event.target.value;
    const valid = event.target.validity.valid;

    setSalary(value);

    if (valid && value) {
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className={cl["TaxForm"]}>
      <h2 className={cl["TaxForm__title"]}>Налоговый вычет</h2>
      <p className={cl["TaxForm__note"]}>
        Используйте налоговый вычет чтобы погасить ипотеку досрочно.
        <br /> Размер налогового вычета составляет не более 13% от своего
        официального годового дохода.
      </p>

      <form onSubmit={handleSubmit}>
        <div className={cl["TaxForm__line"]}>
          <label htmlFor="salary" className={cl["TaxForm__line-label"]}>
            Ваша зарплата в месяц
          </label>
          <MyInput
            name="salary"
            value={salary}
            onChange={handleSalaryChange}
            type="number"
            placeholder="Заполните поле"
            suffix="₽"
            pattern="[0-9]*"
          />
          {error && (
            <div className={cl["TaxForm__line-error"]}>
              Поле обязательно для заполнения
            </div>
          )}
          <div className={cl["TaxForm__line-link"]}>Рассчитать</div>
        </div>
        {!!payments.length && (
          <div className={cl["TaxForm__line"]}>
            <label className={cl["TaxForm__line-label"]}>
              Итого можете внести в качестве досрочных:
            </label>
            <div className={cl["TaxForm__payments"]}>
              {payments &&
                payments.map((p, index) => (
                  <PaymentLine
                    key={p.id}
                    item={p}
                    index={index}
                    onChange={handleCheckboxChange}
                  />
                ))}
            </div>
          </div>
        )}

        <div className={cl["TaxForm__line"]}>
          <div className={cl["TaxForm__line-row"]}>
            <label
              className={classnames(
                cl["TaxForm__line-label"],
                cl["TaxForm__line-label--inline"]
              )}
            >
              Что уменьшаем?
            </label>
            <div className={cl["TaxForm__checker"]}>
              <div className={cl["TaxForm__checker-item"]}>
                <MyRadio
                  value="payment"
                  label="Платёж"
                  checked={type === "payment"}
                  id="payment"
                  name="radio_payment_type"
                  onChange={(e) => setType(e.target.value)}
                />
              </div>
              <div className={cl["TaxForm__checker-item"]}>
                <MyRadio
                  value="term"
                  label="Срок"
                  checked={type === "term"}
                  id="term"
                  name="radio_payment_type"
                  onChange={(e) => setType(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={cl["TaxForm__bottom"]}>
          <MyButton
            type="submit"
            disabled={error}
            theme="red"
            wide
          >
            Добавить
          </MyButton>
        </div>
      </form>
    </div>
  );
};

export default TaxForm;
