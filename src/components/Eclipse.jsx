import { cn } from "../lib/utils";

const Eclipse = ({ styles }) => {
  return (
    <div
      className={cn(
        "w-[769px] h-[676px] absolute bg-ecl rounded-full",
        "mask-image: radial-gradient(circle, rgba(171,85,223,0.55) 50%, transparent 100%)",
        styles
      )}
    ></div>
  );
};

export default Eclipse;
