import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="flex justify-between items-center bg-purple-900 py-3 text-white">
      <img
        className="ml-10"
        src="src/components/img/pro2 1.svg"
        alt="Prop Logo"
      />

      <div className="flex items-center">
        <img src="src/components/img/Ellipse 10.svg" alt="Eclipse" />
        <Button className="mx-5">Explore Propout</Button>
        <Button className="mr-20">Connect Wallet</Button>
      </div>
    </div>
  );
};

export default Header;
