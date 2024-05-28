import { useState, useEffect } from "react";

const CurrencySymbol = ({ amount }) => {
  const [pay, setPay] = useState(0);
  function formatCurrency(number, currency = "USD") {
    //   // Use Intl.NumberFormat for locale-aware formatting
    const formatter = new Intl.NumberFormat("en-US", {
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

  return (
    <div>
      <p>{pay}/month</p>
    </div>
  );
};

export default CurrencySymbol;
