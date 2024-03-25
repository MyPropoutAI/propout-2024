import { Button } from "../../components/ui/button";

const Card = () => {
  return (
    <div className="bg-white  rounded-md overflow-hidden relative">
      <img
        src="/images/market_image_1.svg"
        alt=""
        className="w-full h-[300px] object-cover object-center"
      />
      <div className=" absolute top-0 right-0 py-2 px-4 bg-blue-700 text-sm text-white">
        FOR RENT
      </div>

      <div className="p-3">
        <p className=" text-sm text-red-900">$3400/month</p>
        <p className=" font-bold text-lg my-2">New Apartment Nice view</p>
        <p className=" text-sm text-gray-600">
          Beautiful Huge 1 family House in the Heart of westburg. Newly
          Renovated with new woods
        </p>
        <div className="flex items-center justify-center gap-8 my-3 text-sm text-gray-600">
          <div className="flex flex-col items-center">
            <p>3</p>
            <p>Bedroom</p>
          </div>
          <div className="flex flex-col items-center">
            <p>3</p>
            <p>Bedroom</p>
          </div>
          <div className="flex flex-col items-center">
            <p>3</p>
            <p>Bedroom</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img
              src="./images/pk.jpg"
              alt="agent"
              className="h-[65px] aspect-square object-cover object-top border-blue-800 border-4 rounded-full"
            />
            <div>
              <p>Adams Cane</p>
              <p>Estate Agent</p>
            </div>
          </div>

          <Button>See More</Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
