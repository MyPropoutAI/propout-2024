import React from "react";

const More = () => {
  return (
    <div>
      <div className="bg-white relative rounded-md text-black">
        <div>
          <img
            src="/images/rent.svg"
            className="min-w-[100%] max-h-[200px]  rounded-[3.08px] object-cover object-center"
            alt="images"
          />
          <p className="px-5 py-2 text-white bg-[#0EFC25] w-fit absolute right-0 top-0">
            For Rent
          </p>
        </div>
        <div className="text-[14px] p-4">
          <p className="text-[#FF0606] text-left">$3400/month</p>
          <p className="font-bold md:text-xl text-lg text-black py-2">
            New Apartment Nice view.
          </p>
          <p className="text-[#0000009E]">
            Beautiful Huge 1 family House in the Heart of westburg. Newly
            Renovated with new woods
          </p>
          <div className=" flex gap-3 items-center text-[#0000009E] py-2">
            <p className="text-center">
              3 <br /> Bedroom
            </p>
            <p className="text-center">
              2 <br />
              Bathrooom{" "}
            </p>
            <p className="text-center">
              {" "}
              3450 <br />
              square ft
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default More;
