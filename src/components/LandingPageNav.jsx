import { Link } from "react-router-dom";
//import { Connect } from "./ConnectButton";
import Wrapper from "./Wrapper";
import { Button } from "./ui/button";

const navLink = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: "Explore Propout", path: "/explore" },
  { name: "Road Map", path: "/road-map" },
  { name: "Guide", path: "/guide" },
];

const LandingPageNav = () => {
  return (
    <div className="bg-purple-900 sticky top-0 z-20">
      <Wrapper>
        <div className="flex justify-between items-center text-white">
          <Link to={"/"}>
            <img src="/images/pro2 1.svg" alt="Prop Logo" />
          </Link>

          <div className="flex items-center gap-6">
            {/* <div className="flex gap-2 items-center cursor-pointer">
              <img
                src="/images/Ellipse 10.svg"
                alt="Eclipse"
                className="w-10 aspect-square"
              />
              <img src="/images/dropdown.svg" alt="" className="w-4" />
            </div> */}

            {/* <Button variant="propout" size="default">
              <Link to="/list">Explore Propout</Link>
            </Button> */}

            <div className="flex space-x-2 items-center">
              {navLink.map((url, i) => (
                <Button key={i} variant="ghost">
                  <Link to={url.path}>{url.name}</Link>
                </Button>
              ))}
            </div>

            {/* <div>
              <Connect />
            </div> */}
            <Link to="/auth/register">
              <Button className="border border-purple-500 border-solid">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default LandingPageNav;
