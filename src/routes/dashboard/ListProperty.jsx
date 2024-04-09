import { useState } from "react";
import { Button } from "../../components/ui/button";

const ListProperty = () => {
  const [images, setImages] = useState([""]);

  const [loading, setIsLoading] = useState(false);

  // const handleChange = (fieldName, e) => {
  //   setForm({ ...form, [fieldName]: e.target.value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     await callListProperty({
  //       ...form,
  //       price: ethers.utils.parseUnits(form.price, 18),
  //     });
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
          className="absolute right-0 top-0 bg-white h-full p-6 flex place-items-center cursor-pointer"
          onClick={handleAddImage}
        >
          <img src="/images/Add Image.svg" alt="" />
        </div>
      </div>

      <div className="flex gap-10 flex-col lg:flex-row">
        <div className="flex-[3]"></div>
        <div className="flex-[2]"></div>
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
      {/* <Button
        className="w-full text-white font-bold text-base mt-5 rounded-lg"
        asChild
      > */}
      <label
        htmlFor={`img-${i}`}
        className="cursor-pointer absolute inset-0 appearance-none"
      ></label>
      {/* </Button> */}
    </div>
  );
};
