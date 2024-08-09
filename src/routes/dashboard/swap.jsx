import Swaphistory from "../../components/Swaphistory";
import Swapbox from "./Swapbox";
const Swap = () => {
  return (
    <div className=" bg-gray-50 w-full min-h-screen pb-10 mx-auto ">
      <div className="flex flex-col gap-10">
        <div className=" flex justify-center items-center mt-3 ">
          <Swapbox />
        </div>
        <div className="bg-gray-50 mx-4 text-gray-900 rounded-md ">
          <Swaphistory />
        </div>
      </div>
    </div>
  );
};

export default Swap;
