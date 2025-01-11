import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const CurrencySymbol = ({ amount, listType }) => {
  const [pay, setPay] = useState(0);

  function formatCurrency(number, currency = "NGN") {
    // Remove commas from input if they exist
    const cleanAmount =
      typeof number === "string" ? number.replace(/,/g, "") : number;

    // Use Intl.NumberFormat for locale-aware formatting
    const formatter = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currency,
    });

    const formattedValue = formatter.format(cleanAmount);
    setPay(formattedValue);
    return formattedValue;
  }

  useEffect(() => {
    const getMoney = () => {
      const res = formatCurrency(amount);
      setPay(res);
    };
    getMoney();
  }, [amount]);

  return (
    <div className="text-sm md:text-md">
      {listType === "RENT" ? <p>{pay}/year</p> : <p>{pay}</p>}
    </div>
  );
};

// Add prop types validation
CurrencySymbol.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  listType: PropTypes.string.isRequired,
};

export default CurrencySymbol;
