import { Link } from "react-router-dom";
//import { Connect } from "./ConnectButton";
import Wrapper from "./Wrapper";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const mobileNav = [
  { name: "Home", path: "/" },
  { name: "Faucet", path: "/home/testnet/faucet", state: true },
  { name: "Get token", path: "https://app.optimism.io/faucet", state: true },
  { name: "Explore Propout", path: "/list", state: true },
  {
    name: "Join the waitlist",
    path: "http://waitlist-propout.onrender.com",
    state: true,
  },
];
const navLink = [
  { name: "Home", path: "/" },
  // { name: "Blog", path: "/blog" },
  { name: "Explore Propout", path: "/home/list" },
  { name: "Faucet", path: "/home/testnet/faucet", state: true },
  { name: "Get token", path: "https://app.optimism.io/faucet", state: true },
  {
    name: "Join the waitlist",
    path: "http://waitlist-propout.onrender.com",
    state: true,
  },
  // { name: "Road Map", path: "/road-map" },
  // { name: "Guide", path: "/guide" },
];

const LandingPageNav = () => {
  return (
    <div className="bg-purple-900 sticky top-0 z-20">
      <Wrapper>
        <div className="flex justify-between items-center text-white">
          <Link to={"/"}>
            <img src="/images/pro2 1.svg" alt="Prop Logo" />
          </Link>

          <div className="hidden lg:flex items-center gap-6">
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
            <Link to="/auth/login">
              <Button className="border border-purple-500 border-solid text-white">
                Get Started
              </Button>
            </Link>
          </div>

          <div className="flex lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <img src="/images/menu-icon.svg" alt="" />
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col text-white gap-2 my-2">
                  {mobileNav.map((link, i) => (
                    <Link key={i} to={link.path}>
                      <div className="hover:bg-gray-50 rounded-md hover:text-gray-900 pl-3 py-2">
                        {link.name}
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="lg:flex items-center gap-8 mt-24">
                  <Link to="/auth/login">
                    <Button className="border border-purple-500 border-solid text-white">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default LandingPageNav;
