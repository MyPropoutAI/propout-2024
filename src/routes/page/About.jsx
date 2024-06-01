import { Button } from "../../components/ui/button";

const About = () => {
  return (
    <div className="flex flex-col space-y-4 items-center min-h-screen">
      <div>
        <img src="/images/abouthhero.svg" alt="" />
      </div>
      <div className="bg-[#320051]">
        <div className=" bg-hero  bg-purple-950 text-white px-5  ">
          <h1 className="my_underline font-bold text-4xl">ABOUT US</h1>
          <div className="flex flex-col gap-4 text-justify px-20">
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

        <div className=" bg-purple-950 ">
          <h1 className="my_underline font-bold text-4xl text-white">
            HERE WE ARE MAKING A DIFFERENCE{" "}
          </h1>

          <div className="flex text-justify-center items-center gap-5 px-20 mt-5 text-[#320051]">
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
      </div>
    </div>
  );
};

export default About;
