import Back from "../../components/Back";
import Wrapper from "../../components/Wrapper";

const AboutHero = () => {
  return (
    <div className=" b bg-cover bg-center">
      <Wrapper>
        <div className="relative py-10 md:py-16">
          <div className="absolute top-5 md:top-10 left-8 hidden lg:block text-white">
            <Back color="text-black" />
          </div>
          <div>
            <img
              src="/images/abouthero.svg"
              alt=""
              className="w-full max-w-[500px] mx-auto"
            />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default AboutHero;
