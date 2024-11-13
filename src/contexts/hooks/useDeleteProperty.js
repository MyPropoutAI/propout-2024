export const UseDeleteProperty = () => {
  const deleteProperty = async (data) => {
    const res = await fetch(`https://proput-db-jlb1.onrender.com/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: data.userid,
        propertyid: data.propertyid,
      }),
    });
    const result = await res.json();
    console.log(result);
    return result;
  };
  return { deleteProperty };
};
