import SellHero from "./SellHero";

import { useStateContext } from "../../../lib/Context";
import { useState } from "react";
import { ethers } from "ethers";
import Listing from "./Listing";

const Sell = () => {
  const { callListProperty } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);

  const [form, setForm] = useState({
    propertyTitle: "",
    price: "",
    description: "",
    images: "",
    propertyAddress: "",
  });

  const handleChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await callListProperty({
      ...form,
      price: ethers.utils.parseUnits(form.price, 18),
    });
    setIsLoading(false);
  };
  return (
    <div className="bg-main">
      <SellHero />
      <Listing />
    </div>
  );
};

export default Sell;
