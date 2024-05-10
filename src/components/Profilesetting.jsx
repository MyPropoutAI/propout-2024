import React from "react";

const Profilesetting = () => {
  return (
    <div>
      <h1 className="text-left text-[#320051] font-semibold py-2">
        Profile settings
      </h1>
      <hr />
      <div>
        <form action="">
          <div className="md:flex gap-5">
            <div className="flex-1">
              <p className="text-[#320051] py-2 text-lg ">First name</p>
              <input
                type="text"
                placeholder="Joel"
                className="outline-[#320051] border rounded-md px-2 py-2 w-full"
                required
              />
            </div>
            <div className="flex-1">
              <p className="text-[#320051] py-2 text-lg">Phone number</p>
              <input
                type="tel"
                placeholder="+234 *****"
                className="outline-[#320051] border rounded-md px-2 py-2 w-full"
                required
              />
            </div>
          </div>

          <div className="md:flex gap-5">
            <div className="flex-1">
              <p className="text-[#320051] py-2 text-lg ">Last name</p>
              <input
                type="text"
                placeholder="Pillar"
                className="outline-[#320051] border rounded-md px-2 py-2 w-full"
                required
              />
            </div>
            <div className="flex-1">
              <p className="text-[#320051] py-2 text-lg">Occupation</p>
              <input
                type="text"
                placeholder="Designer"
                className="outline-[#320051] border rounded-md px-2 py-2 w-full"
                required
              />
            </div>
          </div>

          <div className="md:flex gap-5">
            <div className="flex-1">
              <p className="text-[#320051] py-2 text-lg ">Email address</p>
              <input
                type="email"
                placeholder="Joelpillar@gmail.com"
                className="outline-[#320051] border rounded-md px-2 py-2 w-full"
                required
              />
            </div>
            <div className="flex-1">
              <p className="text-[#320051] py-2 text-lg">Wallet address</p>
              <input
                type="text"
                placeholder="0xe33...."
                className="outline-[#320051] border rounded-md px-2 py-2 w-full"
                required
              />
            </div>
          </div>

          <div className="md:flex gap-5">
            <div className="flex-1">
              <p className="text-[#320051] py-2 text-lg ">Country</p>
              <input
                type="text"
                placeholder="Netherlands"
                className="outline-[#320051] border rounded-md px-2 py-2 w-full"
                required
              />
            </div>
            <div className="flex-1">
              <p className="text-[#320051] py-2 text-lg">Description</p>
              <input
                type="text"
                placeholder="Sent 14m for those houses on rent"
                className="outline-[#320051] border rounded-md px-2 py-2 w-full"
                required
              />
            </div>
          </div>

          <div className="flex justify-center mx-5 mt-4 ">
            <button
              type="submit"
              className=" bg-btnGrad text-white rounded-md font-bold px-5 py-2 flex-1"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profilesetting;
