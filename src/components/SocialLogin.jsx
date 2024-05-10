export function SocialLogin() {
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
    <div className="flex flex-col justify-center items-center w-[90%]">
      <div className="flex gap-5 items-center justify-center w-[100%] py-2.5  mt-5 text-base text-black ">
        <div className="flex gap-5">
          <div className="shrink-0 self-stretch my-auto h-px bg-black border border-black border-solid w-[119px]" />
          <div className="self-stretch">Or continue with</div>
          <div className="shrink-0 self-stretch my-auto h-px bg-black border border-black border-solid w-[119px]" />
        </div>
      </div>
      <div className="flex gap-5 space-x-3 self-center py-2.5  mt-4 ">
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
    </div>
  );
}
