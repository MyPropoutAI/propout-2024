import { Link } from "react-router-dom";
import { ConnectButton } from "./ConnectButton";
import { Button } from "./ui/button";
import Wrapper from "./Wrapper";

const Header = () => {
  return (
    <div className="bg-purple-900 sticky top-0 z-10">
      <Wrapper>
        <div className="flex justify-between items-center text-white">
          <Link to={"/"}>
            <img src="/images/pro2 1.svg" alt="Prop Logo" />
          </Link>

          <div className="flex items-center">
            <img src="/images/Ellipse 10.svg" alt="Eclipse" />
            <Button className="mx-5" asChild>
              <Link to="/list">Explore Propout</Link>
            </Button>
            <ConnectButton className="bg-gradient-to-r from-[#C064F8]  to-[#FF087F]" />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Header;
