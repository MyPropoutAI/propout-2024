const TextContent = ({ children, className }) => (
  <div
    className={`text-center text-white max-md:max-w-full max-md:text-4xl ${className}`}
  >
    {children}
  </div>
);

const GradientText = ({ children }) => (
  <div className="flex flex-col justify-center px-2 max-md:max-w-full max-md:text-4xl">
    <div className="bg-clip-text max-md:max-w-full max-md:text-4xl">
      {children}
    </div>
  </div>
);

const Button = ({ children, className }) => (
  <button
    className={`justify-center px-14 py-5 rounded-xl max-md:pr-6 max-md:pl-5 ${className}`}
  >
    {children}
  </button>
);

function Index() {
  return (
    <div className="flex flex-col items-center p-20 text-7xl bg-slate-900 leading-[66.24px] max-md:px-5 max-md:text-4xl">
      <TextContent className="mt-36 max-md:mt-10">
        Welcome to the Future of
      </TextContent>
      <div className="flex flex-col justify-center px-3 pt-3 max-w-full text-center whitespace-nowrap w-[538px] max-md:text-4xl">
        <GradientText>Homeownership</GradientText>
      </div>
      <TextContent className="mt-10 text-lg w-[766px]">
        Making buying and selling real estate easier than ever by combining
        traditional and blockchain property transactions with smart contracts,
        leveraging the blockchain.
      </TextContent>
      <div className="flex gap-4 mt-14 max-w-full text-sm font-semibold leading-5 text-white w-[415px] max-md:mt-10">
        <Button>Get Started</Button>
        <Button className="border border-purple-500 border-solid">
          Learn More
        </Button>
      </div>
    </div>
  );
}

export default Index;
