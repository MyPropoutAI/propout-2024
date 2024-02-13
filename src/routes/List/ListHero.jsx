import Hero from "../../components/Hero";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const ListHero = () => {
  return (
    <Hero>
      <div className="text-center flex flex-col gap-5 text-white items-center">
        <h1 className="text-[25px] md:text-[35px] font-[700] leading-snug max-w-[700px] mx-auto">
          List Properties online
        </h1>
        <p className="mt-3 font-[7000] text-base max-w-[480px] mx-auto leading-normal">
          Re-list random properties up "for sale" or "to let". Join the real
          estate affiliate markets
        </p>
        <div className="my-5">
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Get started" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rent">List for rent</SelectItem>
              <SelectItem value="sale">List for sale</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <img
            src="/images/list hero.svg"
            alt=""
            className="w-full max-w-[500px] mx-auto"
          />
        </div>
      </div>
    </Hero>
  );
};

export default ListHero;
