import Swaphistory from "../../../components/Swaphistory";
import Swapbox from "../../dashboard/Swapbox";
const Swap = () => {
  return (
    <div className=" bg-[#AB55DF]/55 bg-hero min-h-screen pb-10 mx-auto ">
      <div className="flex flex-col gap-10">
        <div className=" grid place-items-center mt-3 ">
          <Swapbox />
        </div>
        <div className="bg-[#320051] mx-6 rounded-md ">
          <Swaphistory />
        </div>
      </div>
    </div>
  );
};

export default Swap;
