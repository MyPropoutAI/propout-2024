function EmailInput() {
  return (
    <div className="flex flex-col w-[44%] max-md:ml-0 max-md:w-full">
      <form className="z-10 justify-center items-start self-stretch px-7 py-8 my-auto w-full text-sm bg-white rounded-lg text-black text-opacity-40 max-md:px-5 max-md:mt-10">
        <label htmlFor="emailInput" className="sr-only">
          Enter your email address
        </label>
        <input
          type="email"
          id="emailInput"
          placeholder="Enter your email address"
          className="w-full bg-transparent focus:outline-none"
        />
      </form>
    </div>
  );
}

function SubscribeButton() {
  return (
    <div className="flex flex-col ml-5 w-[56%] max-md:ml-0 max-md:w-full">
      <div className="flex overflow-hidden relative flex-col grow justify-center items-center  py-20 text-xl font-bold text-white whitespace-nowrap min-h-[308px] max-md:px-5 max-md:max-w-full">
        <button
          type="submit"
          className="relative justify-center px-12 py-2.5 mt-9 rounded-lg max-md:px-5 bg-gradient-to-r from-[#C064F8] to-[#FF087F] text-white"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}

export default function NewsLetter() {
  return (
    <section className="bg-purple-800">
      <div className="flex items-center gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-[46%] max-md:ml-0 max-md:w-full">
          <h2 className="text-2xl font-semibold text-white w-[60%]">
            Don&apos;t miss out - Subscribe to our newsletter mailing list
          </h2>
        </div>
        <div className="flex flex-col ml-5 w-[54%] max-md:ml-0 max-md:w-full">
          <div className="grow max-md:mt-6 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <EmailInput />
              <SubscribeButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
