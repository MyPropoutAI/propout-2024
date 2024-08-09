import { useReadContract } from "thirdweb/react";
// import Card from "../marketplace/Card";
import { listingContract } from "../../lib/constants";
import { resolveMethod } from "thirdweb";
import Rentsample from "../../components/Rentsample";
import { Link } from "react-router-dom";

const Properties = () => {
  const { data, isLoading } = useReadContract({
    contract: listingContract,
    method: resolveMethod("getAllProperties"),
    params: [],
  });

  if (isLoading) return <p>Loading.....</p>;

  return (
    <div className="py-16 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-20">
        {data?.map((item, i) => (
          <Link to={`/home/property-description/${item.propertyId}`} key={i}>
            <Rentsample data={item} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Properties;
