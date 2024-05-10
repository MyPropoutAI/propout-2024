import React from "react";

const Accountsetting = () => {
  return (
    <div>
      <h1 className="text-left text-[#320051] font-semibold py-2">
        Account Security
      </h1>
      <hr />
      <form action="">
        <div className="">
          <p className="text-[#320051] py-2 text-lg ">Change password</p>
          <input
            type="text"
            placeholder="*******"
            className="outline-[#320051] border rounded-md px-2 py-2 md:w-[50%]"
            required
          />

          <p className="text-[#320051] py-2 text-lg ">Confirm new password</p>
          <input
            type="password"
            placeholder="*******"
            className="outline-[#320051] border rounded-md px-2 py-2 md:w-[50%]"
            required
          />
          <div className="md:w-[50%] text-[#320051]">
            <p>Add 2FA</p>
            <p className="text-[12px]">
              Two Factor Authentication help secure your account and dominion
              over your data.
            </p>
            <button
              type="submit"
              className="border bg-[#320051] text-white border-[#320051] rounded-md px-3 mt-2 py-2 w-full"
            >
              Enable Verification
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Accountsetting;
