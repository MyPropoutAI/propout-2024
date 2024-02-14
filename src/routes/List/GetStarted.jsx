import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

const GetStarted = () => {
  return (
    <div className="flex flex-col gap-5 items-center py-10 bg-white border-t border-gray-500">
      <img
        src="/images/get started avatar.svg"
        alt=""
        className="max-w-[180px]"
      />
      <Button
        variant="normal"
        className="px-8 md:px-44 text-white rounded-md"
        asChild
      >
        <Link to={"/list/sell"}>Get Started</Link>
      </Button>
    </div>
  );
};

export default GetStarted;
