import { useState, useEffect } from "react";

export const getProperties = async () => {
  const res = await fetch("https://proput-db-g4te.onrender.com/all");
  const data = await res.json();
  console.log(data);
  return data;
};
