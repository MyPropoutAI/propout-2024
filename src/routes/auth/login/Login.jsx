import * as React from "react";

function Logo() {
  return (
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/60507062f6761029905ba90327e0be3e618455f3af1406070bada7754452514c?apiKey=bbf9ac6af1f24c1b84cd517d4adf8c22&"
      alt="Company logo"
      className="ml-4 w-6 aspect-square fill-white max-md:ml-2.5"
    />
  );
}

function EmailInput() {
  return (
    <div className="justify-center items-start px-7 py-6 mt-10 text-sm rounded-md border border-black border-solid text-black text-opacity-50 max-md:px-5 max-md:max-w-full">
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email address"
        className="w-full bg-transparent focus:outline-none"
      />
    </div>
  );
}

function PasswordInput() {
  return (
    <div className="flex gap-5 justify-between py-5 pr-20 pl-8 mt-7 text-sm whitespace-nowrap rounded-md border border-black border-solid text-black text-opacity-50 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
      <label htmlFor="password" className="sr-only">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        className="w-full bg-transparent focus:outline-none"
      />
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c3e717f09e703977614b6ae2249b844cc862604de55a8119e153c7f9d7e9f859?apiKey=bbf9ac6af1f24c1b84cd517d4adf8c22&"
        alt="Toggle password visibility"
        className="shrink-0 self-start mt-1.5 aspect-[1.47] fill-stone-400 w-[22px] cursor-pointer"
      />
    </div>
  );
}

function RememberMe() {
  return (
    <div className="flex gap-2.5 py-0.5">
      <div className="flex justify-center items-center">
        <input
          type="checkbox"
          id="remember"
          name="remember"
          className="sr-only"
        />
        <label htmlFor="remember">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/16765d5d11b61db0f5379ef76daa1b2dad8ff4e843e8dba62632cf547e28e8e3?apiKey=bbf9ac6af1f24c1b84cd517d4adf8c22&"
            alt=""
            className="rounded-md aspect-[1.16] w-[42px]"
          />
        </label>
      </div>
      <label htmlFor="remember" className="my-auto text-base text-black">
        Remember password
      </label>
    </div>
  );
}

function ForgotPassword() {
  return (
    <a href="#" className="my-auto text-base text-purple-600">
      Forgot password
    </a>
  );
}

function LoginButton() {
  return (
    <button className="justify-center items-center px-5 py-3.5 mt-16 text-base font-bold text-white rounded-lg max-md:px-5 max-md:mt-10 max-md:max-w-full">
      Log in
    </button>
  );
}

function SignUp() {
  return (
    <p className="self-center mt-6 text-base text-purple-600">
      Don't have an account?
      <a href="#" className="font-medium text-purple-600">
        Sign up
      </a>
    </p>
  );
}

function SocialLogin() {
  const socialProviders = [
    {
      name: "Google",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e147b6a1142524fd9a97281cb2e807ec8719ddb766adaf440f6963493a187355?apiKey=bbf9ac6af1f24c1b84cd517d4adf8c22&",
      alt: "Google logo",
      className: "w-5 aspect-square fill-yellow-400",
    },
    {
      name: "Apple",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/11ea0d764e4e9456f3af53336772437d0c19fb277db7565c4861103fc128f93f?apiKey=bbf9ac6af1f24c1b84cd517d4adf8c22&",
      alt: "Apple logo",
      className: "shrink-0 aspect-[1.41] w-[34px]",
    },
    {
      name: "Facebook",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8431a9745397c15ee0e5fb08363a6d4d3e971f99fb33901ed7eb2200e9935754?apiKey=bbf9ac6af1f24c1b84cd517d4adf8c22&",
      alt: "Facebook logo",
      className: "shrink-0 w-6 aspect-square fill-sky-500",
    },
  ];

  return (
    <>
      <div className="flex gap-5 items-center self-center py-2.5 pr-20 mt-5 text-base text-black max-md:flex-wrap max-md:pr-5">
        <div className="shrink-0 self-stretch my-auto h-px bg-black border border-black border-solid w-[119px]" />
        <div className="self-stretch">Or continue with</div>
        <div className="shrink-0 self-stretch my-auto h-px bg-black border border-black border-solid w-[119px]" />
      </div>
      <div className="flex gap-5 justify-between self-center py-2.5 pr-9 mt-4 max-md:pr-5">
        {socialProviders.map((provider) => (
          <a
            key={provider.name}
            href="#"
            className="flex justify-center items-center p-0.5"
          >
            <img
              loading="lazy"
              src={provider.icon}
              alt={provider.alt}
              className={provider.className}
            />
          </a>
        ))}
      </div>
    </>
  );
}

function LoginForm() {
  return (
    <div className="flex flex-col self-stretch px-5 pt-2.5 my-auto max-md:mt-10 max-md:max-w-full">
      <h1 className="self-start text-4xl font-bold text-black">Log in</h1>
      <form>
        <EmailInput />
        <PasswordInput />
        <div className="flex gap-5 justify-between mt-7 w-full max-md:flex-wrap max-md:max-w-full">
          <RememberMe />
          <ForgotPassword />
        </div>
        <LoginButton />
      </form>
      <SignUp />
      <SocialLogin />
    </div>
  );
}

function HeroImage() {
  return (
    <div className="flex overflow-hidden relative flex-col grow justify-center items-start px-16 py-16 min-h-[1024px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/293e93f772f383f98a85706498990f3f1e35b28db6a4c5c7acb883637da70d42?apiKey=bbf9ac6af1f24c1b84cd517d4adf8c22&"
        alt="Decorative background"
        className="object-cover absolute inset-0 size-full"
      />
      <Logo />
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="bg-white">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <HeroImage />
        </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
