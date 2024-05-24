import React from "react";
import { Button } from "./ui/button";

export default function Rentsample() {
  return (
    <div className="bg-white relative rounded-md">
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
        <p className="font-bold text-lg py-2">New Apartment Nice view.</p>
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

        {/* <div className="flex gap-2 items-center py-3">
          <img src="/images/adams.svg" className="h-[50px]" alt="" />

          <div className="flex flex-col text-[14px]">
            <p className="font-bold">Adams Cane</p>

            <p> Estate Agent</p>
          </div>

          <Button variant="rent" size="property">
            See More
          </Button>
        </div> */}
      </div>
    </div>
  );
}
