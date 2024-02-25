import React from "react";
import Wrapper from "../../components/Wrapper";

const Aboutservices = () => {
  return (
    <div className="bg-[#ba6ee9] text-white text-lg font-sans ">
      <div className="text-center">
        <p className=" text-center mb-2">How it works</p>
        <p className="font-bold mb-2 text-2xl">Our Best Services</p>
        <p className="text-center">
          Utilizing the Propout A.I to checkmate and conveniently flip property
          assets remotely. Open participation for all kinds of users with the
          following in-built AI tech integrations to foster trust, transperency,
          and convenience.
        </p>
      </div>

      <div className=" mt-10">
        <div className="flex items-center gap-4 mb-3">
          <figure className=" grid place-items-center rounded-full bg-white">
            <img
              src="   /images/property_trading.svg"
              className="h-16 w-16 mx-auto "
              alt=""
            />
          </figure>
          <p> Property trading system</p>
        </div>

        <div className="flex items-center gap-4  mb-3">
          <figure className="  grid place-items-center rounded-full bg-white">
            <img
              src="   /images/property_allocation.svg"
              className="h-16 w-16 mx-auto "
              alt=""
            />
          </figure>
          <p>Property allocation system </p>
        </div>

        <div className="flex items-center gap-4  mb-3">
          <figure className="  grid place-items-center rounded-full bg-white">
            <img
              src="  /images/property_identification.svg"
              className="h-16 w-16 mx-auto "
              alt=""
            />
          </figure>
          <p>Property identification system </p>
        </div>

        <div className="flex items-center gap-4  mb-3">
          <figure className="  grid place-items-center rounded-full bg-white">
            <img
              src="   /images/property_verification.svg"
              className="h-16 w-16 mx-auto "
              alt=""
            />
          </figure>
          <p> Property verification system </p>
        </div>

        <div className="flex items-center gap-4  mb-3">
          <figure className="  grid place-items-center rounded-full bg-white">
            <img
              src="   /images/ai_assistance.svg"
              className="h-16 w-16 mx-auto "
              alt=""
            />
          </figure>
          <p> A.I assistance </p>
        </div>

        <div className="flex items-center gap-4">
          <figure className="  grid place-items-center rounded-full bg-white">
            <img
              src="   /images/Governance.svg"
              className="h-16 w-16 mx-auto "
              alt=""
            />
          </figure>
          <p>Governance </p>
        </div>
      </div>
    </div>
  );
};

export default Aboutservices;
