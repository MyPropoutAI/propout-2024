import Wrapper from "../../components/Wrapper";

const Mobilesneak = () => {
  return (
    <div className=" bg-mobile-sneak bg-cover relative bg-center isolate">
      <div className="absolute inset-0 bg-slate-900 opacity-90 -z-20" />
      <Wrapper>
        <div className="text-center text-white py-5 md:py-10 pb-14">
          <p className="text-2xl md:text-4xl font-[700] leading-snug max-w-[400px] mx-auto leading-snug">
            Our Mobile Application sneak peek
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-10">
            <img
              src="/images/Onboarding two 1.svg"
              alt=""
              className="w-1/4 basis-[300px]"
            />
            <img
              src="/images/Home scr 6 1.svg"
              alt=""
              className="w-1/4 basis-[300px]"
            />
            <img
              src="/images/Market place A scr 1.svg"
              alt=""
              className="w-1/4 basis-[300px]"
            />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Mobilesneak;
