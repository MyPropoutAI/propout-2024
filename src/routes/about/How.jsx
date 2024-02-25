import React from "react";
import Wrapper from "../../components/Wrapper";

const How = () => {
  return (
    <div className=" bg-main p-5 text-white">
      <Wrapper>
        <div className=" ">
          <p className="text-center mb-8 font-bold my_underline">
            HOW WE ARE MAKING A DIFFERENCE
          </p>
          <div id="This is flex" className="flex justify-between">
            <div className="border-white border-4 p-4">
              <p className="text-[#E08400]  font-bold">A.I AUTOMATION</p>
              <p>No errors. Garbage-in Gargabe-out</p>
            </div>

            <div className="border-white border-4 p-4">
              <p className="text-[#E08400] font-bold">
                100% TRANSPARENCY AND SPEED
              </p>
              <p>Secured through A.I technology</p>
            </div>

            <div className="border-white border-4 p-4">
              <p className="text-[#E08400]  font-bold">
                100% COMMUNITY SATISFACTION{" "}
              </p>
              <p>Decentralized (Open participation)</p>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default How;
