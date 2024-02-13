import Wrapper from "../../../components/Wrapper";
import Back from "../../../components/Back";

const SellHero = () => {
  return (
    <div className=" bg-sell-bg bg-cover bg-center">
      <Wrapper>
        <div className="relative py-10 md:py-16">
          <div className="absolute top-5 md:top-10 left-8 hidden lg:block text-white">
            <Back />
          </div>
          <div className="flex flex-col gap-8 text-white items-center text-center py-10">
            <p className="font-[700] text-4xl">List Properties online</p>
            <p className="max-w-[650px]">
              List random properties around you that are up for sale or to let.
              Join the real estate affiliate market
            </p>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default SellHero;
