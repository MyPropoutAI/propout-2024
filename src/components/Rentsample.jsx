import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export default function Rentsample({ data }) {
  // console.log(data);
  return (
    <div className="bg-white relative rounded-md">
      <div>
        <img
          //Unknown**
          // src={`https://white-active-whippet-173.mypinata.cloud/ipfs/${data?.images[0]}`}
          src="/images/house2.svg"
          className="min-w-[100%] max-h-[200px] rounded-[3.08px] object-cover object-centers"
          alt="images"
        />

        <p className="px-5 py-2 text-white bg-[#0EFC25] w-fit absolute right-0 top-0">
          For Rent
        </p>
      </div>
      <div className="text-[14px] p-4">
        <p className="text-[#FF0606] text-left">
          ${data?.price.toString()}/month
        </p>
        <p className="font-bold text-lg py-2">New Apartment Nice view.</p>
        <p className="text-[#0000009E] line-clamp-2">{data?.description}</p>
        <div className=" flex gap-3 items-center text-[#0000009E] py-2">
          <p className="text-center">
            {data?.propertySpec.toString()} <br /> Bedroom
          </p>
          <p className="text-center">
            {data?.propertyType.toString()} <br />
            Type{" "}
          </p>
          <p className="text-center">
            {" "}
            {data?.square.toString()}
            <br />
            square ft
          </p>
        </div>
        <div className="flex justify-between items-center gap-4">
          <img src="/images/adams.svg" className="h-[50px]" alt="" />

          <p className="font-semibold text-[12px] flex items-center ">
            Adams Cane
          </p>
          <Button variant="rent" size="property">
            See More
          </Button>
        </div>

        {/* <div className="flex gap-2 items-center py-3">
          <img src="/images/adams.svg" className="h-[50px]" alt="" />

          <div className="flex flex-col text-[14px]">
            <p className="font-bold">Adams Cane</p>

            <p> Estate Agent</p>
          </div>
          <Link to={"/home/agent"}>
            <Button variant="rent" size="property">
              See More
            </Button>
          </Link>
        </div>

          <Button variant="rent" size="property">
            See More
          </Button>
        </div> */}
      </div>
    </div>
  );
}
