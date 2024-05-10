import { Link } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { Button } from "../../components/ui/button";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const scenarios = [
  {
    title: "Case Scenario 1",
    scenes: [
      "Find a listed property",
      "Re-list on PROPOUT",
      "Clients scout for properties",
      "Deal-breaker",
      "Earn percentage.",
    ],
  },
  {
    title: "Case Scenario 2",
    scenes: [
      "Link Property data with Propout A.I",
      "PROPOUT AI authenticates data",
      "Upon successful linking",
      "List real estate property on Propout",
      "Successful listing is open for trade",
      "Virtual inspection",
      "Deal-breaker",
      "AI process payment and records transaction data and history",
    ],
  },
  {
    title: "Case Scenario 3",
    scenes: [
      "Save files, Fiats, Documents, and Digital assets.",
      "Stake assets for long term rewards",
      "Learn or facilitate other digital skills",
      "Contribute to Propout A.I awareness and adoption",
      "Identify with a thriving community.",
    ],
  },
];

const items = scenarios.map((scenario) => {
  return (
    <div key={scenario.title} className="min-w-[300px] border rounded-md">
      <Button variant="orangeBTN">{scenario.title}</Button>
      <div className="mt-5 flex flex-col gap-y-4 ">
        <ul className=" list-disc list-inside">
          {scenario.scenes.map((scene, i) => (
            <li key={i}>{scene}</li>
          ))}
        </ul>
      </div>
    </div>
  );
});

const Scenarios = () => {
  return (
    <div className="bg-white ">
      <Wrapper>
        <div className="py-10">
          <div className="text-center flex flex-col gap-8 items-center">
            <p className="text-3xl font-[700]">How it work</p>
            <p className="max-w-[650px]">
              Listing properties on Propout. Flip at your convenience and earn
              well! Bringing the real estate sector into one single marketplace
              and transparent community.
            </p>
          </div>

          <div className="flex  gap-[10%] justify-cener mt-16 overflow-auto scroll pb-8 px-[5%]">
            {/* {scenarios.map((scenario) => (
              <div key={scenario.title} className="min-w-[300px] ">
                <Button variant="orangeBTN">{scenario.title}</Button>
                <div className="mt-5 ">
                  <ul className=" list-disc list-inside">
                    {scenario.scenes.map((scene, i) => (
                      <li key={i}>{scene}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))} */}
            <AliceCarousel
              mouseTracking
              items={items}
              responsive={{
                0: {
                  items: 1,
                },
                850: {
                  items: 2,
                },

                1024: {
                  items: 3,
                  itemsFit: "contain",
                },
              }}
              controlsStrategy="responsive"
              disableButtonsControls
            />
          </div>
        </div>
      </Wrapper>
      <div className="w-full mb-[-8rem] flex justify-center items-center z-10">
        <div className=" rounded-b-xl w-[40%]   shadow-md mx-auth py-4 bg-[#320051] flex flex-col items-center">
          <h1 className="text-3xl font-extrabold text-center text-white">
            Explore Properties
          </h1>
          <p className="text-sm  text-white my-3 w-[76%] text-center">
            Here are few of the properties listed on propout, stand a chance of
            getting to your targeted audiences with propout.
          </p>
          <Link to="/home/about"></Link>
          <Button className="py-2 my-3  text-center font-semibold rounded-md bg-gradient-to-r from-[#C064F8] to-[#FF087F] text-white  px-4  shadow-sm">
            Learn More...
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Scenarios;
