import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

const ListProperty = () => {
  const [images, setImages] = useState([""]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const newImages = [...images];
    newImages[index] = URL.createObjectURL(file);
    setImages(newImages);
  };

  const handleAddImage = () => {
    setImages([...images, ""]);
  };
  return (
    <div className="bg-white p-8 rounded-md">
      <div className="border-2 p-4 rounded-md flex gap-5 relative overflow-hidden max-w-full">
        {images.map((image, i) => (
          <UploadImage
            image={image}
            handleUpload={handleImageChange}
            key={i}
            i={i}
          />
        ))}

        <div
          className="absolute right-0 top-0 bg-white h-full p-6 flex place-items-center cursor-pointer shadow-2xl"
          onClick={handleAddImage}
        >
          <img src="/images/Add Image.svg" alt="" />
        </div>
      </div>

      <div className="flex gap-20 flex-col lg:flex-row mt-10">
        <div className="flex-[3] flex  ">
          <form className="flex flex-col gap-5 w-full">
            <div>
              <Input
                type="text"
                placeholder="Headline"
                className="w-full texl-lg"
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Property Price"
                className="w-full texl-lg"
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Square ft"
                className="w-full texl-lg"
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Room Specification"
                className="w-full texl-lg"
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Type"
                className="w-full texl-lg"
              />
            </div>
            <div>
              <Textarea
                type="text"
                placeholder="Description"
                className="w-full texl-lg min-h-40"
              />
            </div>
          </form>
        </div>
        <div className="flex-[2] ">
          <div className=" bg-[#EBEBEB] rounded-lg">
            <p className="pt-5 text-center font-bold text-lg text-[#320051]">
              PREVIEW
            </p>

            <div className="p-3">
              <div className="h-[250px] bg-[#DDE1E6] mt-5 relative  overflow-hidden">
                <span className=" absolute py-2 px-5 top-0 right-0 bg-[#0EFC25] text-white font-semibold">
                  FOR RENT
                </span>
              </div>
              <div className="bg-white p-5">
                <p className="text-lg text-[#FF0606]">Price/month</p>
                <p className="my-3 font-bold text-xl">Headline</p>
                <p>Description</p>

                <div className="flex items-center justify-between my-5">
                  <div className="text-center">
                    <p>0</p>
                    <p>Bedroom</p>
                  </div>
                  <div className="text-center">
                    <p>0</p>
                    <p>Bedroom</p>
                  </div>
                  <div className="text-center">
                    <p>0</p>
                    <p>Square</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img
                      src="/images/userpic.svg"
                      alt=""
                      className="h-12 aspect-square border-4 rounded-full bg-slate-900"
                    />
                    <div>
                      <p className=" font-bold">Adams Cane</p>
                      <p className="text-sm">Estate agent</p>
                    </div>
                  </div>
                  <Button className=" rounded-md text-white px-8">
                    See more{" "}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProperty;

const UploadImage = ({ image, handleUpload, i }) => {
  return (
    <div className=" basis-[200px] relative">
      <div className="w-full aspect-square bg-[#F2F4F8] grid place-items-center rounded-2xl">
        {image ? (
          <img
            src={image}
            alt="Uploaded Image "
            className="max-w-full max-h-[250px]"
          />
        ) : (
          <img src="/images/image-upload.svg" alt="" />
        )}
      </div>
      <input
        className="hidden"
        type="file"
        id={`img-${i}`}
        accept="image/*"
        onChange={(e) => handleUpload(e, i)}
      />

      <label
        htmlFor={`img-${i}`}
        className="cursor-pointer absolute inset-0 appearance-none"
      ></label>
    </div>
  );
};
