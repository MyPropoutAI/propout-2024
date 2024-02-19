import Wrapper from "../../../components/Wrapper";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";

import { useStateContext } from "../../../lib/Context";
import { useRef, useState } from "react";
import { ethers } from "ethers";
// import Web3Btn from "../../../components/Web3Button";
// import { Web3Button } from "@thirdweb-dev/react";

const Listing = () => {
  const { callListProperty } = useStateContext();

  const [loading, setIsLoading] = useState(false);
  //   const [properties, setProperties] = useState([]);
  const [image0, setImage0] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [form, setForm] = useState({
    propertyTitle: "",
    price: "",
    description: "",
    images:
      "https://images.propertypro.ng/large/2-bedroom-detached-bungalow-in-epe-lagos-nigeria-73WIcgOJYA8u2u3mDZK3.jpg",
    propertyAddress: "",
  });

  const handleChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await callListProperty({
      ...form,
      price: ethers.utils.parseUnits(form.price, 18),
    });
    setIsLoading(false);
  };

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  return (
    <div className="p-10">
      <Wrapper>
        <div className="flex gap-8  flex-wrap justify-center">
          <UploadImage
            imageUrl={image0}
            onChange={(e) => handleImageChange(e, setImage0)}
          />
          <UploadImage
            imageUrl={image1}
            onChange={(e) => handleImageChange(e, setImage1)}
          />
          <UploadImage
            imageUrl={image2}
            onChange={(e) => handleImageChange(e, setImage2)}
          />
          <UploadImage
            imageUrl={image3}
            onChange={(e) => handleImageChange(e, setImage3)}
          />
          <UploadImage
            imageUrl={image4}
            onChange={(e) => handleImageChange(e, setImage4)}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full lg:w-2/3 items-center mx-auto gap-4 mt-10">
            <Label htmlFor="address" className="text-white text-2xl font-bold">
              Property Title
            </Label>
            <Input
              id="address"
              type="text"
              className="w-full mx-auto text-xLG p-3"
              autoComplete="off"
              onInput={(e) => handleChange("propertyTitle", e)}
            />
          </div>
          <div className="grid w-full lg:w-2/3 items-center mx-auto gap-4 mt-10">
            <Label htmlFor="address" className="text-white text-2xl font-bold">
              Property Price
            </Label>
            <Input
              id="address"
              type="number"
              className="w-full mx-auto text-xLG p-3"
              autocomplete="off"
              onInput={(e) => handleChange("price", e)}
            />
          </div>
          <div className="grid w-full lg:w-2/3 items-center mx-auto gap-4 mt-10">
            <Label htmlFor="address" className="text-white text-2xl font-bold">
              Property Address
            </Label>
            <Input
              id="address"
              type="text"
              className="w-full mx-auto text-xLG p-3"
              onInput={(e) => handleChange("propertyAddress", e)}
            />
          </div>
          <div className="grid w-full lg:w-2/3 items-center mx-auto gap-4 mt-10">
            <Label htmlFor="desc" className="text-white text-2xl font-bold">
              Property Description
            </Label>
            <Textarea
              id="desc"
              type="text"
              className="w-full mx-auto text-LG p-3"
              onInput={(e) => handleChange("description", e)}
            />
          </div>

          <Button
            className="w-full lg:w-2/3 text-white mx-auto block mt-10 text-lg h-14"
            // onClick={handleSubmit}
          >
            {loading ? "Listing..." : "List Property"}
            {/* <Web3Btn text="List Property" /> */}
          </Button>
        </form>
      </Wrapper>
    </div>
  );
};

export default Listing;

const UploadImage = ({ imageUrl, onChange }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };
  return (
    <div className=" basis-[250px]">
      <div className="w-full h-[300px] bg-white grid place-items-center rounded-2xl">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Uploaded Image "
            className="max-w-full max-h-[300px]"
          />
        ) : (
          <img src="/images/image-upload.svg" alt="" />
        )}
      </div>
      <p className="mt-3 text-center text-white text-sm">
        Upload a clear picture of the property you want to list
      </p>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        id="img"
        accept="image/*"
        onChange={onChange}
      />
      <Button
        className="w-full text-white font-bold text-base mt-5 rounded-lg"
        asChild
      >
        <label onClick={handleClick} htmlFor="im" className="cursor-pointer">
          {imageUrl ? "Change Image" : "Upload Image"}
        </label>
      </Button>
    </div>
  );
};
