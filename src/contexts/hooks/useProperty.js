import { useEffect, useState } from "react";

const url = "https://proput-db-jlb1.onrender.com/all";

export const useGetProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProperty = async () => {
      setLoading(true);
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res) {
        setLoading(false);
        console.log("failed to fetch property");
        return;
      }
      setLoading(false);
      const data = await res.json();
      console.log(data);
      setProperties(data);
    };

    getProperty();
  }, []);

  return { properties, loading };
};
