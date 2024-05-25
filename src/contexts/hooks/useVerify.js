//import { BiErrorCircle } from "react-icons/bi";

export const useVerify = async (data, userId) => {
  try {
    const response = await fetch(
      `https://proput-db.onrender.com/update_credentials
`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, id: userId }),
      }
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};
