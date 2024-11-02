import { useState, useEffect } from "react";
//import { useAuthcontext } from ".";
export const useFetchUser = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  //const { user } = useAuthcontext();
  const token = localStorage.getItem("propoutUser");
  console.log(token);
  useEffect(() => {
    const storedData = async () => {
      try {
        const res = await fetch(
          `https://proput-db-g4t.onrender.com/protected
`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: token,
            },
          }
        );
        const json = await res.json();
        if (!json) {
          setLoading(false);
          return;
        }
        if (res.ok) {
          setData(json);
          setLoading(false);
        }
        console.log(json);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    storedData();
  }, []);

  return { loading, data };
};
