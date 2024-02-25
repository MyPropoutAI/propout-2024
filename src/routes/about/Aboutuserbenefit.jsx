import React from "react";
import Wrapper from "../../components/Wrapper";

const Aboutuserbenefit = () => {
  return (
    <div className="bg-purple-900 text-white">
      <br />

      <div className="text-[#964CC3]  bg-white text-center">
        <p className="font-bold text-2xl">User Benefits</p>
        <p className="">
          Built for everyone to be inclusive in the real estate game.
        </p>
      </div>

      <div>
        <div className=" mt-10">
          <div className="flex items-center gap-4 mb-3">
            <p> Investment</p>
            <figure className=" grid place-items-center rounded-full bg-white">
              <img
                src="   /images/investment.svg"
                className="h-16 w-16 mx-auto "
                alt=""
              />
            </figure>
          </div>

          <div className="flex items-center gap-4  mb-3">
            <p>Fractional ownership </p>
            <figure className="  grid place-items-center rounded-full bg-white">
              <img
                src="   /images/Fractional_ownership.svg"
                className="h-16 w-16 mx-auto "
                alt=""
              />
            </figure>
          </div>

          <div className="flex items-center gap-4  mb-3">
            <p>Community and Crowdfunding </p>
            <figure className="  grid place-items-center rounded-full bg-white">
              <img
                src="  /images/Community_crowding.svg"
                className="h-16 w-16 mx-auto "
                alt=""
              />
            </figure>
          </div>

          <div className="flex items-center gap-4  mb-3">
            <p> Property information request and data </p>
            <figure className="  grid place-items-center rounded-full bg-white">
              <img
                src="   /images/property_information.svg"
                className="h-16 w-16 mx-auto "
                alt=""
              />
            </figure>
          </div>

          <div className="flex items-center gap-4  mb-3">
            <p> Property proof of ownership</p>
            <figure className="  grid place-items-center rounded-full bg-white">
              <img
                src="   /images/property_proof.svg"
                className="h-16 w-16 mx-auto "
                alt=""
              />
            </figure>
          </div>

          <div className="flex items-center gap-4">
            <p>Making informed property decisions </p>
            <figure className="  grid place-items-center rounded-full bg-white">
              <img
                src="   /images/Making_informed_property_decisions.svg"
                className="h-16 w-16 mx-auto "
                alt=""
              />
            </figure>
          </div>

          <div className="flex items-center gap-4">
            <p>A.I Chatbot </p>
            <figure className="  grid place-items-center rounded-full bg-white">
              <img
                src="   /images/A.i_chatbot.svg"
                className="h-16 w-16 mx-auto "
                alt=""
              />
            </figure>
          </div>
        </div>
      </div>
      {/* https://www.figma.com/file/wpPdCqDPA12zJUy13Mu9fJ/PROPOUT?type=design&node-id=2118-53676&mode=design&t=99lF3Oa8aZK3ZZ9d-0* */}
    </div>
  );
};

export default Aboutuserbenefit;
