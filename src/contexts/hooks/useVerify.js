//import { BiErrorCircle } from "react-icons/bi";
import { useState } from "react";

export const useVerify = () => {
  const [loading, setLoading] = useState(false);
  const verify = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      const res = await fetch(
        `https://proput-db.onrender.com/update_credentials`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const resData = await res.json();
      setLoading(false);
      console.log(resData);
      return resData;
    } catch (err) {
      console.log(err);
    }
  };

  return { verify, loading };
};

// try {
//   const response = await fetch(
//     `https://proput-db.onrender.com/update_credentials
// `,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ ...data, id: userId }),
//     }
//   );
//   const json = await response.json();
//   return json;
// } catch (error) {
//   console.log(error);
// }
