import Logo from "./Logo";

export const AuthBg = () => {
  return (
    <div className="flex overflow-hidden relative flex-col grow justify-center items-start px-16 py-16 min-h-screen max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/293e93f772f383f98a85706498990f3f1e35b28db6a4c5c7acb883637da70d42?apiKey=bbf9ac6af1f24c1b84cd517d4adf8c22&"
        alt="Decorative background"
        className="object-cover absolute inset-0 "
      />
      <Logo />
    </div>
  );
};
