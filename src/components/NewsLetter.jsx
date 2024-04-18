import React from "react";

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
      <div className="flex overflow-hidden relative flex-col grow justify-center items-center px-16 py-20 text-xl font-bold text-white whitespace-nowrap min-h-[308px] max-md:px-5 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/257ee231b47d250af61fd786ae1236a6a873a3c3651b13817bbaabdf4561c79f?apiKey=bbf9ac6af1f24c1b84cd517d4adf8c22&"
          alt=""
          className="object-cover absolute inset-0 size-full"
        />
        <button
          type="submit"
          className="relative justify-center px-12 py-2.5 mt-9 rounded-lg max-md:px-5"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}

function MyComponent() {
  return (
    <section className="bg-purple-800">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-[46%] max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0acfb6c2f7cc07e329d677786ae5db9723bcf03b9ea4998540287146d379ffaf?apiKey=bbf9ac6af1f24c1b84cd517d4adf8c22&"
            alt="Descriptive alt text for the image"
            className="grow w-full aspect-[2.08] max-md:mt-6 max-md:max-w-full"
          />
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
