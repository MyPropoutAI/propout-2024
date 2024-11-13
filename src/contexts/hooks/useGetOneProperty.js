export const UseGetOneProperty = () => {
  const getOneProperty = async (id) => {
    console.log("property id", id);
    const res = await fetch(
      `https://proput-db-jlb1.onrender.com/one
`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyid: id,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch property");
    }
    const result = await res.json();
    console.log(result);
    return result;
  };
  return { getOneProperty };
};
