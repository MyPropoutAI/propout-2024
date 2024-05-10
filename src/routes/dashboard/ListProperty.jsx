import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { prepareContractCall, resolveMethod } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { toast } from "sonner";
import { contract } from "../../lib/utils";

const ListProperty = () => {
  const [images, setImages] = useState([""]);

  const { mutate: sendTransaction, isLoading, isError } = useSendTransaction();

  const account = useActiveAccount();

  const [form, setForm] = useState({
    owner: "",
    _propertyTitle: " ",
    price: "10",
    _description: " ",
    _images:
      "https://images.propertypro.ng/large/2-bedroom-detached-bungalow-in-epe-lagos-nigeria-73WIcgOJYA8u2u3mDZK3.jpg",
    _propertyAddress: " ",
  });

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const newImages = [...images];
    newImages[index] = URL.createObjectURL(file);
    setImages(newImages);
  };

  const handleAddImage = () => {
    setImages([...images, ""]);
  };

  const handleFormChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  return (
    <div className="bg-white p-8 rounded-md max-w-full">
      <div className="border-2 p-4 rounded-md flex gap-5 relative  ">
        <div className="flex gap-4 overflow-x-auto">
          {images.map((image, i) => (
            <UploadImage
              image={image}
              handleUpload={handleImageChange}
              key={i}
              i={i}
            />
          ))}
        </div>

        <div
          className="absolute right-0 top-0 bg-white h-full p-6 flex place-items-center cursor-pointer shadow-2xl"
          onClick={handleAddImage}
        >
          <img
            src="/images/Add Image.svg"
            alt=""
            className="w-10 aspect-square lg:w-14"
          />
        </div>
      </div>

      <div className="flex gap-20 flex-col lg:flex-row mt-10">
        <div className="flex-[3] flex  ">
          <div className="flex flex-col gap-5 w-full">
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
            <div>
              <TransactionButton
                transaction={() => {
                  const transaction = prepareContractCall({
                    contract,
                    method: resolveMethod("listProperty"),
                    params: [
                      account.address,
                      form.price,
                      form._propertyTitle,
                      form._images,
                      form._propertyAddress,
                      form._description,
                    ],
                  });
                  return transaction;
                }}
                onTransactionConfirmed={(trx) => {
                  toast("Success", {
                    description: "Your property have been listed successfully",
                    action: {
                      label: "View",
                      onClick: () => {
                        window.open(
                          "https://explorer.fuse.io/tx/" + trx.transactionHash,
                          "_blank"
                        );
                      },
                    },
                  });
                }}
                onError={(err) => {
                  if (err.code == "4001") {
                    toast.error("Transaction rejected");
                  } else {
                    console.log(err);
                  }
                }}
                style={{ background: "transparent", padding: 0 }}
              >
                <Button className="text-white px-12 bg-blue-500">
                  List Property
                </Button>
              </TransactionButton>
            </div>
          </div>
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
    <div className="  relative min-w-36 aspect-square md:min-w-48">
      <div className="w-full aspect-square bg-[#F2F4F8] grid place-items-center rounded-2xl">
        {image ? (
          <img
            src={image}
            alt="Uploaded Image "
            className="max-w-ful max-h-[250px]"
          />
        ) : (
          <img src="/images/image-upload.svg" alt="" className="w-1/2" />
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
