//import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Button } from "/src/components/ui/button";
import { useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import { useParams } from "react-router-dom";
import { useReadContract } from "thirdweb/react";
import { listingContract } from "../../lib/utils";
import { resolveMethod } from "thirdweb";

const Propertydesc = () => {
  let { id } = useParams();
  const user = useSelector((state) => state.auth.user);
  //const verified = useSelector((state) => state.auth.isVerified);

  const decodedUser = jwt.decode(user);

  const userAvartar = decodedUser.name.substring(0, 2);

  const { data, isLoading } = useReadContract({
    contract: listingContract,
    method: resolveMethod("getProperty"),
    params: [id],
  });

  console.log(data);
  return (
    <div className="bg-hero bg-[#2A0144] min-h-screen ">
      <div className="md:px-10 px-5">
        <div className="bg-white flex gap-5 px-5 py-4 justify-center rounded-sm text-[13px] md:text-xl">
          <button>
            <FaArrowLeftLong />
          </button>
          <p className="text-red-600">
            We advise you to do a physical inspection before making payments.
            And make payments only to property owners, not propout agents.
          </p>
        </div>
        <div className="flex flex-col gap-5 px-5 text-white pt-5 ">
          <div className="flex-1 grid grid-cols-property-desc gap-4  w-full">
            {data.images.map((img, i) => (
              <img
                src={`https://white-active-whippet-173.mypinata.cloud/ipfs/${img}`}
                key={i}
              />
            ))}
          </div>

          <div>
            <p className="font-bold py-5">Property Address</p>
            <input
              type="text"
              value={data.propertyAddress}
              className="text-[#000000]/70 bg-white border rounded-md outline-[#964CC3] border-[#964CC3] w-full px-4 py-4 md:text-xl font-bold"
              disabled
            />
          </div>

          <div>
            <p className="font-bold py-5">Property Description</p>
            <textarea
              type="text"
              value={data.description}
              className="text-[10px] text-[#000000]/70 bg-white border rounded-md  border-[#964CC3] w-full px-4 py-4 md:text-xl font-bold"
              disabled
            ></textarea>
          </div>

          <div className="flex gap-4 items-center justify-between mx-5">
            <div className="flex-1 flex items-center gap-3">
              <img src="/images/car01.svg" className="w-8 h-7" alt="image" />
              <p className="text-3xl font-bold underline ">
                {data.propertySpec.toString()}
              </p>
            </div>

            <div className="flex-1 flex items-center gap-3">
              <img src="/images/car02.svg" className="w-8 h-7" alt="image" />
              <p className="text-3xl font-bold underline ">2</p>
            </div>

            <div className="flex-1 flex items-center gap-3">
              <img src="/images/caro4.svg" className="w-8 h-7" alt="image" />
              <p className="text-3xl font-bold underline ">32450</p>
            </div>

            <div className="flex-1 flex items-center gap-3">
              <img src="/images/car03.svg" className="w-8 h-7" alt="image" />
              <p className="text-3xl font-bold underline ">1</p>
            </div>
          </div>

          <div className="flex  items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 flex justify-center items-center mb-2 rounded-full border">
                <h1 className="text-white font-bold text-2xl text-center">
                  {userAvartar}
                </h1>
              </div>
              <div>
                <p className="font-bold">{decodedUser.name}</p>
                <p>Estate Agent</p>
              </div>
            </div>

            <Button
              size="lg"
              className=" bg-btnGrad text-white lg mt-4 rounded-md text-xl px-4 flex justify-center items-center gap-2 w-[30%] "
            >
              <img src="/images/Vector-1.svg" alt="" />
              Contact Lister
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Propertydesc;
