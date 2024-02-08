import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import Wrapper from "./Wrapper";

const Header = () => {
  return (
    <div className="bg-purple-900">
      <Wrapper>
        <div className="flex justify-between items-center text-white">
          <img src="src/components/img/pro2 1.svg" alt="Prop Logo" />

          <div className="flex items-center">
            <img src="src/components/img/Ellipse 10.svg" alt="Eclipse" />
            <Button className="mx-5">Explore Propout</Button>
            <Button className="mr-20">Connect Wallet</Button>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Header;
