import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { TransactionButton } from "thirdweb/react";
import { prepareContractCall, resolveMethod } from "thirdweb";
import { toast } from "sonner";
import axios from "axios";
import { listingContract } from "../../lib/utils";

// import ethers

const ListProperty = () => {
  const jwt =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlZjg1YWQ3Yi00MWQ5LTRjNWUtOTk4Zi1lMWQ1ZWRlMzIyMDUiLCJlbWFpbCI6Im9kZWRpcmFuaWZlb2x1d2E3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIxN2U5OWFiMWZmOWQ0Y2ZlNWQwMCIsInNjb3BlZEtleVNlY3JldCI6ImIzNjI4MzllMDdhZTQ1ODkzN2RmYzZmMWUzMjFlNTYyM2RiN2Y1OTFmNmQ4OGZmYWM2OGY1Y2JkN2NhMmYzMGIiLCJpYXQiOjE3MTY0MjU4MjR9.6TT4-F72YEzTFQeNDtBlM5wwGZ3z9_nw6H2gvjtHJCI";

  // const gateway = "https://white-active-whippet-173.mypinata.cloud/"

  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  // const account = useActiveAccount();

  const [form, setForm] = useState({
    _propertyTitle: "",
    price: "",
    _description: "",
    _propertyAddress: "",
  });

  const changeHandler = (event, index) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);

      const newImageURLs = [...imageURLs];
      newImageURLs[index] = URL.createObjectURL(file);
      setImageURLs(newImageURLs);
    }
  };

  const handleAddImage = () => {
    setImages([...images, null]);
    setImageURLs([...imageURLs, ""]);
  };

  const handleFormChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const uploadToIPFS = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const metadata = JSON.stringify({ name: file.name });
    formData.append("pinataMetadata", metadata);
    const options = JSON.stringify({ cidVersion: 0 });
    formData.append("pinataOptions", options);

    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data.IpfsHash;
  };

  const handleSubmission = async () => {
    try {
      const imageIPFSHashes = await Promise.all(images.map(uploadToIPFS));
      const transaction = prepareContractCall({
        contract: listingContract,
        method: resolveMethod("listProperty"),
        params: [
          form.price,
          form._propertyTitle,
          imageIPFSHashes,
          form._propertyAddress,
          form._description,
        ],
      });
      return transaction;
    } catch (error) {
      console.error("Error uploading images or sending transaction: ", error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-md max-w-full">
      <div className="border-2 p-4 rounded-md flex gap-5 relative">
        <div className="flex gap-4 overflow-x-auto">
          {imageURLs.map((image, i) => (
            <UploadImage
              image={image}
              handleUpload={changeHandler}
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
        <div className="flex-[3] flex">
          <div className="flex flex-col gap-5 w-full">
            <div>
              <Input
                type="text"
                placeholder="Headline"
                className="w-full texl-lg"
                onChange={(e) => handleFormChange("_propertyTitle", e)}
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Property Price"
                className="w-full texl-lg"
                onChange={(e) => handleFormChange("price", e)}
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Property Address"
                className="w-full texl-lg"
                onChange={(e) => handleFormChange("_propertyAddress", e)}
              />
            </div>
            <div>
              <Textarea
                type="text"
                placeholder="Description"
                className="w-full texl-lg min-h-40"
                onChange={(e) => handleFormChange("_description", e)}
              />
            </div>
            <div>
              <TransactionButton
                transaction={handleSubmission}
                onTransactionConfirmed={(trx) => {
                  toast("Success", {
                    description: "Your property has been listed successfully",
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
                  if (err.code === "4001") {
                    toast.error("Transaction rejected");
                  } else {
                    console.log(err);
                  }
                }}
                style={{ background: "transparent", padding: 0 }}
              >
                <Button className="text-white px-12 bg-[#964CC3]">
                  List Property
                </Button>
              </TransactionButton>
            </div>
          </div>
        </div>
        <div className="flex-[2]">
          <div className=" bg-[#EBEBEB] rounded-lg">
            <p className="pt-5 text-center font-bold text-lg text-[#320051]">
              PREVIEW
            </p>
            <div className="p-3">
              <div className="h-[250px] bg-[#DDE1E6] mt-5 relative overflow-hidden">
                <span className="absolute py-2 px-5 top-0 right-0 bg-[#0EFC25] text-white font-semibold">
                  FOR RENT
                </span>
                <img
                  src={imageURLs[0]}
                  alt=""
                  className="h-full object-cover object-top"
                />
              </div>
              <div className="bg-white p-5">
                <p className="text-lg text-[#FF0606]">Price/month</p>
                <p className="my-3 font-bold text-xl">{form._propertyTitle}</p>
                <p>{form._description}</p>
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
                      <p className="font-bold">Adams Cane</p>
                      <p className="text-sm">Estate agent</p>
                    </div>
                  </div>
                  <Button className="rounded-md text-white px-8 bg-[#964CC3]">
                    See more
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
    <div className="relative w-36 aspect-square md:min-w-48">
      <div className="w-full aspect-square bg-[#F2F4F8] grid place-items-center rounded-2xl">
        {image ? (
          <img
            src={image}
            alt="Uploaded Image"
            className="max-w-full max-h-[250px]"
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
