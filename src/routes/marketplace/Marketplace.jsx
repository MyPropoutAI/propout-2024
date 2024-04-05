import Back from "../../components/Back";
import Container from "../../components/Container";
import { Input } from "../../components/ui/input";
import { FaMagnifyingGlass } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../../components/ui/button";
import Card from "./Card";

const Marketplace = () => {
  return (
    <div className="bg-main bg-hero bg-repeat-y bg-center">
      <div className="bg-white py-5 rounded-md">
        <Container>
          <div className=" flex items-center gap-10">
            <Back />
            <p className="text-red-900  max-w-[800px text-center">
              We advise you to do a physical inspection before making payments.
              And make payments only to property owners, not propout agents.
            </p>
          </div>
        </Container>
      </div>
      <div className="my-10">
        <Container>
          <div className=" relative">
            <Input
              placeholder=" search your property, location, type, or budget"
              className="placeholder:text-right text-lg pr-20"
            />
            <FaMagnifyingGlass
              color="gray"
              size={20}
              className=" absolute right-10 top-1/2 -translate-y-1/2"
            />
          </div>
          <div className="my-10 p-10 max-w-[800px] mx-auto bg-white rounded-lg flex justify-center items-center gap-5 flex-wrap">
            <Select className="bg-white">
              <SelectTrigger className="w-[200px] bg-white text-lg">
                <SelectValue placeholder="Property Type" className="bg-white" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Types</SelectLabel>
                  <SelectItem value="office" className="cursor-pointer">
                    Office
                  </SelectItem>
                  <SelectItem value="home" className="cursor-pointer">
                    Home
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button className="px-10 rounded-md text-white ">Find now</Button>
          </div>
          <div className="grid grid-cols-three-columns gap-8 mt-10 justify-center">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </Container>
        <div className="pt-10"></div>
      </div>
    </div>
  );
};

export default Marketplace;
