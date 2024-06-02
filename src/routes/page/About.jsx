import { Button } from "../../components/ui/button";

const About = () => {
  return (
    <div className="flex flex-col space-y-4 items-center min-h-screen">
      <div>
        <img src="/images/abouthhero.svg" alt="" />
      </div>
      <div className="bg-[#320051]">
        <div className=" bg-hero  bg-purple-950 text-white px-5  ">
          <h1 className="my_underline font-bold md:text-4xl p-5">ABOUT US</h1>
          <div className="flex flex-col gap-4 md:text-center px-3 text-[13px] md:text-[19px] text-justify md:px-20 ">
            <p>
              Propout' s emergence as a Real Estate Network Technology (RENT)
              presents a groundbreaking opportunity for Nigeria. As the real
              estate sector evolves into a single marketplace, both on a
              national and global scale, Propout' s impact on the country ' s
              economic growth and sustainability cannot be overstated. Here, we
              delve into the myriad ways in which Propout is poised to redefine
              Nigeria ' s real estate landscape and contribute significantly to
              its economic prosperity, including tax revenue generation. As
              Propout continues its transformative journey in the real estate
              landscape, the introduction of artificial intelligence (AI)
              capabilities amplifies its potential
            </p>

            <p>
              Propout' s digital presence opens Nigeria ' s doors to foreign
              investors even on a global stage. International investors are
              drawn to the platform ' s advanced AI capabilities, perceiving it
              as a secure and efficient channel for real estate investments. As
              foreign funds flow into Nigeria ' s real estate market, the nation
              experiences a boost in foreign investment, leading to economic
              growth and job creation. The platform ' s security and efficiency
              also redeem the international interest, potentially bringing a
              wealth of foreign capital into the country ' s real estate market.
            </p>
          </div>
        </div>
        {/* SECTION 1 */}

        <div className=" bg-purple-950 ">
          <h1 className="my_underline font-bold md:text-4xl text-white p-5">
            HERE WE ARE MAKING A DIFFERENCE{" "}
          </h1>

          <div className="md:flex grid p-5 text-justify-center items-center gap-5 md:px-20 mt-5 text-[#320051]">
            <div className="flex flex-col justify-center items-center text bg-white flex-1 p-20 ">
              <h1 className="text-[#E08400] text-3xl font-bold text-justify">
                AI AUTOMATION
              </h1>
              <p>No errors. Garbage-in Gargabe-out</p>
            </div>

            <div className="flex flex-col justify-center items-center text bg-white flex-1 p-16 ">
              <h1 className="text-[#E08400] text-3xl font-bold text-center">
                100% TRANSPARENCY AND SPEED
              </h1>
              <p>Secured through blockchain technology</p>
            </div>

            <div className="flex flex-col justify-center items-center text bg-white flex-1 p-10">
              <h1 className="text-[#E08400] text-3xl font-bold text-center">
                100% COMMUNITY SATISFACTION
              </h1>
              <p>Decentralized</p>
              <p>(Open participation)</p>
            </div>
          </div>
        </div>
        {/*  SECTION 2  */}

        <div className=" bg-[#AB55DF8C]/55 py-5 text-white">
          <div className="flex flex-col items-center text-center mx-auto md:px-20 px-12">
            <div className="py-20">
              <p className=" text-xl">How it works</p>
              <h1 className="text-3xl font-bold py-2">Our best services</h1>
              <p className=" md:max-w-[650px] md:text-[19px] text-[14px] max-w-]">
                Utilizing the Propout A.I to checkmate and conveniently flip
                property assets remotely. Open participation for all kinds of
                users with the following in-built AI tech integrations to foster
                trust, transperency, and convenience.
              </p>
            </div>

            <div className=" grid justify-items-start gap-3">
              <div className="flex gap-3 text-left  items-center text-lg md:text-xl">
                <div className=" rounded-full py-5 px-1 bg-white grid place-items-center">
                  <img src="/images/property_trading.svg" alt="image" />
                </div>
                <p> Property trading system</p>
              </div>
              <div className="flex gap-1 text-left md:gap-3 items-center  text-lg md:text-xl">
                <div className=" rounded-full py-3 px-3 bg-white grid place-items-center">
                  <img src="/images/property_allocation.svg" alt="image" />
                </div>
                <p>Property allocation system</p>
              </div>
              <div className="flex gap-1 text-left md:gap-3 items-center  text-lg md:text-xl">
                <div className=" rounded-full py-3 px-3 bg-white grid place-items-center">
                  <img src="/images/property_allocation.svg" alt="image" />
                </div>
                <p>Property identification system</p>
              </div>
              <div className="flex gap-1 text-left md:gap-3 items-center  text-lg md:text-xl">
                <div className=" rounded-full py-5 px-1 bg-white grid place-items-center">
                  <img src="/images/property_verification.svg" alt="image" />
                </div>
                <p>Property verification system</p>
              </div>
              <div className="flex gap-3  text-left items-center  text-lg md:text-xl">
                <div className=" rounded-full py-4 px-2 bg-white grid place-items-center">
                  <img src="/images/ai_assistance.svg" alt="image" />
                </div>
                <p>Ai assistance</p>
              </div>
              <div className="flex gap-3  text-left items-center  text-lg md:text-xl">
                <div className=" rounded-full py-5 px-2 bg-white grid place-items-center">
                  <img src="/images/Governance.svg" alt="image" />
                </div>
                <p>Governance</p>
              </div>
            </div>
          </div>
        </div>

        {/*  SECTION 3  */}

        <div className=" bg-[#2109308c] text-white">
          <div className="py-5 mt-5 bg-white text-[#964CC3] flex flex-col items-center">
            <h1 className="font-bold md:text-3xl text-xl py-1">
              User Benefits
            </h1>
            <p className="text-sm md:text-lg">
              Built for everyone to be inclusive in the real estate game.
            </p>
          </div>

          <div className=" flex justify-center px-5">
            <div className=" grid justify-items-end py-5  gap-3">
              <div className="flex  gap-1 md:gap-3 text-right items-center text-lg md:text-xl">
                <p> Investment</p>
                <div className=" rounded-full py-5 px-1 bg-white grid place-items-center">
                  <img src="/images/investment.svg" alt="image" />
                </div>
              </div>
              <div className="flex gap-1 md:gap-3 text-right items-center text-lg md:text-xl">
                <p>Fractional ownership</p>

                <div className=" rounded-full py-3 px-3 bg-white grid place-items-center">
                  <img src="/images/Fractional_ownership.svg" alt="image" />
                </div>
              </div>
              <div className="flex gap-1 md:gap-3 text-right items-center text-lg md:text-xl">
                <p>Community and crowding</p>

                <div className=" rounded-full py-4 px-3 bg-white grid place-items-center">
                  <img src="/images/Community_crowding.svg" alt="image" />
                </div>
              </div>
              <div className="flex gap-1 md:gap-3 text-right  items-center text-lg md:text-xl">
                <p>Property information request and data</p>

                <div className=" rounded-full py-5 px-1 bg-white grid place-items-center">
                  <img src="/images/property_information.svg" alt="image" />
                </div>
              </div>

              <div className="flex gap-1 md:gap-3 text-right  items-center text-lg md:text-xl">
                <p>Property proof of ownership</p>

                <div className=" rounded-full py-5 px-2 bg-white grid place-items-center">
                  <img src="/images/property_proof.svg" alt="image" />
                </div>
              </div>

              <div className="flex gap-1 md:gap-3 text-right  items-center text-lg md:text-xl">
                <p>Making informed property decisions</p>

                <div className=" rounded-full py-5 px-2 bg-white grid place-items-center">
                  <img
                    src="/images/Making_informed_property_decisions.svg"
                    alt="image"
                  />
                </div>
              </div>
              <div className="flex gap-1 md:gap-3 text-right  items-center text-lg md:text-xl">
                <p>A.I Chatbot</p>

                <div className=" rounded-full py-4 px-2 bg-white grid place-items-center">
                  <img src="/images/ai_assistance.svg" alt="image" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  SECTION 4 */}
        <div className=" bg-purple-950 ">
          <h1 className="my_underline font-bold md:text-4xl text-white p-5">
            OUR ROAD MAP{" "}
          </h1>

          <div className=" flex px-16 justify-center py-10">
            <img src="/images/roadmap.svg" alt="images" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
