import React from "react";
import AliceCarousel from "react-alice-carousel";

const cards = [
  {
    icon: "/images/over-1.svg",
    bgImage: "/images/over-1.svg",
    amount: "$1,000,000",
    des: "Total asset value ",
  },
  {
    icon: "/images/over-2.svg",
    bgImage: "/images/over-2.svg",
    amount: 20,
    des: "Property Listed ",
  },
  {
    icon: "/images/over-3.svg",
    bgImage: "/images/over-3.svg",
    amount: 15,
    des: "Closed deals ",
  },
  {
    icon: "/images/over-4.svg",
    bgImage: "/images/over-4.svg",
    amount: 5,
    des: "Purchased properties",
  },
];

const items = cards.map((card, index) => {
  return (
    <div
      key={index}
      className="w-40 border-none bg-task-hero-card- bg-right bg-no-repeat  overflow-hidden  rounded-lg h-[120px] relative"
    >
      <img
        src={card.icon}
        alt=""
        className="absolute right-0 top-0 h-full translate-x-1/2 opacity-25"
      />
      <div className="h-full w-full bg-refer-gradient p-4 pt-8 ">
        <img src={card.bgImage} alt="" />
        <p className=" font-thin text-[13px]">{card.des}</p>
        <p className="font-semibold">{card.amount}</p>
      </div>
    </div>
  );
});

const Overviewhero = () => {
  return (
    <div className=" bg-refer-hero p-4 pb-10  bg-lilac   rounded-md text-white">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5  h-full justify-center">
        {items}

        {/* <div className="w-40 border-none bg-task-hero-card- bg-right bg-no-repeat  overflow-hidden  rounded-lg h-[120px] relative">
          <img
            src="/images/over-1.svg"
            alt=""
            className="absolute right-0 top-0 h-full translate-x-1/2 opacity-25"
          />
          <div className="h-full w-full bg-refer-gradient p-4 pt-8 ">
            <img src="/images/over-1.svg" alt="" />
            <p className=" font-thin text-[13px]">Total asset value </p>
            <p className="font-semibold">$1,000,000</p>
          </div>
        </div>

        <div className="w-40 border-none bg-task-hero-card- bg-right bg-no-repeat  overflow-hidden  rounded-lg h-[120px] relative">
          <img
            src="/images/over-2.svg"
            alt=""
            className="absolute right-0 top-0 h-full translate-x-1/2 opacity-25"
          />
          <div className="h-full w-full bg-refer-gradient p-4 pt-8 ">
            <img src="/images/over-2.svg" alt="" />
            <p className=" font-thin text-[13px]">Property Listed </p>
            <p className="font-semibold">20</p>
          </div>
        </div>

        <div className="w-40 border-none bg-task-hero-card- bg-right bg-no-repeat  overflow-hidden  rounded-lg h-[120px] relative">
          <img
            src="/images/over-3.svg"
            alt=""
            className="absolute right-0 top-0 h-full translate-x-1/2 opacity-25"
          />
          <div className="h-full w-full bg-refer-gradient p-4 pt-8 ">
            <img src="/images/over-3.svg" alt="" />
            <p className=" font-thin text-[13px]">Closed deals </p>
            <p className="font-semibold">15</p>
          </div>
        </div>

        <div className="w-40 border-none bg-task-hero-card- bg-right bg-no-repeat  overflow-hidden  rounded-lg h-[120px] relative">
          <img
            src="/images/over-4.svg"
            alt=""
            className="absolute right-0 top-0 h-full translate-x-1/2 opacity-25"
          />
          <div className="h-full w-full bg-refer-gradient p-4 pt-8 ">
            <img src="/images/over-4.svg" alt="" />
            <p className=" font-thin text-[13px]">Purchased properties </p>
            <p className="font-semibold">5</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Overviewhero;
