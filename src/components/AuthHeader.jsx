import { Link } from "react-router-dom";
import { Connect } from "./ConnectButton";
import { Button } from "./ui/button";
import Wrapper from "./Wrapper";

const links = [
  { name: "Faucet", path: "/testnet/faucet", state: true },
  { name: "Faucet", path: "/testnet/faucet", state: true },
  { name: "Faucet", path: "/testnet/faucet", state: true },
];

const AuthHeader = () => {
  return (
    <div className="bg-white sticky top-0 z-10 text-black px-6">
      <div className="flex justify-between items-center text-whit">
        <div className="flex items-center gap-10">
          <Link to={"/"}>
            <img src="/images/pro2 1.svg" alt="Prop Logo" />
          </Link>
          <div className="lg:flex text-lg gap-5 hidden">
            {links.map((link) => (
              <Link to={link.path}>{link.name}</Link>
            ))}
          </div>
        </div>

        <div className="lg:flex items-center gap-8 hidden">
          <div className=" h-12 aspect-square rounded-xl bg-[#C064F8] grid place-items-center relative">
            <img src="/images/bell.svg" className="h-7 aspect-square" />
            <span className="h-3 aspect-square bg-[#E72BAC] rounded-full absolute right-3 top-3"></span>
          </div>
          <Connect />
        </div>

        <div className="lg:hidden flex items-center gap-5">
          {/*  */}
          <div>
            <img src="/images/menu-icon.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;
