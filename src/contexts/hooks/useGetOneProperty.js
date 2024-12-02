export const UseGetOneProperty = () => {
  const getOneProperty = async (id) => {
    console.log("property id", id);
    const res = await fetch(`https://proput-db-jlb1.onrender.com/one/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch property");
    }
    const result = await res.json();
    console.log(result);
    return result;
  };
  return { getOneProperty };
};
