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
import { PropertyType } from "../../lib/PropertyType";
import { useReadContract } from "thirdweb/react";
import { listingContract } from "../../lib/constants";
import { resolveMethod } from "thirdweb";
import Rentsample from "../../components/Rentsample";
import { Link } from "react-router-dom";
import Combobox2 from "../../components/Combobox";

const Marketplace = () => {
  const { data, isLoading } = useReadContract({
    contract: listingContract,
    method: resolveMethod("getAllProperties"),
    params: [],
  });

  console.log(data, "bingo");
  return (
    <div className="bg-[#2A0144] bg-hero bg-repeat-y bg-center">
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

      <div className="flex justify-center my-4 rounded-md ">
        <Combobox2 />
      </div>

      <div className="my-10">
        <Container>
          {/* <div className="my-10 p-10 max-w-[800px] mx-auto bg-white rounded-lg flex justify-center items-center gap-5 flex-wrap">
            <Select className="bg-white">
              <SelectTrigger className="w-[200px] bg-white text-lg">
                <SelectValue placeholder="Property Type" className="bg-white" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Types</SelectLabel>

                  {PropertyType.map((type, i) => (
                    <SelectItem key={i} value={type} className="cursor-pointer">
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button className="px-10 rounded-md text-white ">Find now</Button>
          </div> */}
          <div className="grid grid-cols-three-columns gap-8 mt-10 justify-center">
            {data?.map((item, i) => (
              <Link
                to={`/home/property-description/${item.propertyId}`}
                key={i}
              >
                <Rentsample data={item} />
              </Link>
            ))}
          </div>
        </Container>
        <div className="pt-10"></div>
      </div>
    </div>
  );
};

export default Marketplace;
