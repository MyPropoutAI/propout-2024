import { useState, useEffect } from "react";

const CurrencySymbol = ({ amount, listType }) => {
  const [pay, setPay] = useState(0);
  function formatCurrency(number, currency = "NGN") {
    //   // Use Intl.NumberFormat for locale-aware formatting
    const formatter = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currency,
    });
    setPay(formatter.format(number));
    // Format the number and return the result
    return formatter.format(number);
  }

  useEffect(() => {
    const getMoney = () => {
      const res = formatCurrency(amount);
      console.log(res);
      setPay(res);
    };
    getMoney(amount);
  }, [amount]);

  return <div>{listType === "RENT" ? <p>{pay}/month</p> : <p>{pay}</p>}</div>;
};

export default CurrencySymbol;
