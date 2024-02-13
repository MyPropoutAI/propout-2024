import Wrapper from "../../components/Wrapper";
import { Button } from "../../components/ui/button";

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
      "Save files, Fiats, Documents, and Digital assets.",
      "Stake assets for long term rewards",
      "Learn or facilitate other digital skills",
      "Contribute to Propout A.I awareness and adoption",
      "Identify with a thriving community.",
    ],
  },
  {
    title: "Case Scenario 3",
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
];

const HowItWorks = () => {
  return (
    <div className="bg-white overflow-x-hidden">
      <Wrapper>
        <div className="py-10">
          <div className="text-center flex flex-col gap-8 items-center">
            <p className="text-3xl font-[700]">How it work</p>
            <p className="max-w-[650px]">
              Listing properties on Propout. Flip at your convenience and earn
              well! Bringing the real estate sector into one single marketplace
              and transparent community.
            </p>
            <img
              src="/images/prop-mobile.svg"
              alt=""
              className="max-w-[400px] w-full"
            />
          </div>

          <div className="flex  gap-[10%] justify-cener mt-16 overflow-auto scroll pb-8 px-[5%]">
            {scenarios.map((scenario) => (
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
            ))}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default HowItWorks;
