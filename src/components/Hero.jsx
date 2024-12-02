import Back from "./Back";
import Wrapper from "./Wrapper";

const Hero = ({ children }) => {
  return (
    <div
      className="bg-hero bg-top bg-cover overflow-hidden"
      style={{
        backgroundImage: "url('/images/Propout Landing Page.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Wrapper>
        <div className="relative py-10 md:py-16">
          <div className="absolute top-5 md:top-10 left-8 hidden lg:block text-white">
            <Back />
          </div>
          {children}
        </div>
      </Wrapper>
    </div>
  );
};

export default Hero;
