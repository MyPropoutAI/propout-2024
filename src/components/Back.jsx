import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Back = ({ color }) => {
  const navigate = useNavigate();
  return (
    <div className=" cursor-pointer">
      <BiArrowBack size={25} onClick={() => navigate(-1)} className={color} />
    </div>
  );
};

export default Back;
