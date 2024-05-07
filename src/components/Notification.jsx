import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Notification = () => {
  return (
    <div>
      <h1 className="text-left text-[#320051] font-semibold py-2">
        Notification Preferences
      </h1>
      <hr />
      <div>
        <div className="py-2">
          <div className="flex justify-between space-x-2 ">
            <Label htmlFor="listing" className="text-[#320051]">
              New Listing Alert
            </Label>
            <Switch id="listing" className="bg-slate-100" />
          </div>
          <p className="text-[10px] -mt-[5px] text-gray-400">
            Get notify whenever properties are being listed
          </p>
        </div>
        <div className="py-2">
          <div className="flex justify-between space-x-2 ">
            <Label htmlFor="listing" className="text-[#320051]">
              Push Notification
            </Label>
            <Switch id="listing" className="bg-slate-100" />
          </div>
          <p className="text-[10px] -mt-[5px] text-gray-400">
            You'll get notify whenever you complete task successfully
          </p>
        </div>

        <div className="py-2">
          <div className="flex justify-between space-x-2 ">
            <Label htmlFor="listing" className="text-[#320051]">
              Email Notification
            </Label>
            <Switch id="listing" className="bg-slate-100" />
          </div>
          <p className="text-[10px] -mt-[5px] text-gray-400">
            Get personalized notification
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
