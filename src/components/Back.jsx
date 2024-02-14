import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();
  return (
    <div className=" cursor-pointer">
      <BiArrowBack size={25} onClick={() => navigate(-1)} />
    </div>
  );
};

export default Back;
