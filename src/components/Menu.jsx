import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const links = [
  { link: "Home", url: "/" },
  { link: "About us", url: "/home/about" },
  { link: "List", url: "/home/list" },
  { link: "Marketplace", url: "/home/marketplace" },
  { link: "whitepaper", url: "/whitepaper" },
  { link: "airdrop", url: "/airdrop" },
  { link: "blog", url: "/blog" },
  { link: "Rent API", url: "https://www.rentglobal.xyz" },
];

export function Menu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <img
          src="/images/menu.svg"
          alt="images"
          className="w-10 cursor-pointer"
        />
      </SheetTrigger>
      <SheetContent
        className="w-[100vw] h-fit bg-[#964CC3] top-20 left-1/2 -translate-x-1/2"
        style={{ minWidth: "80vw" }}
      >
        <div className=" flex flex-col gap-2 justify-center py-6">
          {links.map((link) => (
            <SheetClose key={link.link} asChild>
              <Link
                to={link.url}
                className="bg-white p-4 rounded-xl w-2/3 min-w-[320px] mx-auto capitalize"
              >
                {link.link}
              </Link>
            </SheetClose>
          ))}
        </div>
        <SheetClose asChild className="absolute right-3 top-3 cursor-pointer">
          {/* <img src="/images/close.svg" alt="" className="w-8 cursor-pointer" /> */}
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
