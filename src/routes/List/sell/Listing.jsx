import Wrapper from "../../../components/Wrapper";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";

import { useStateContext } from "../../../lib/Context";
import { useRef, useState } from "react";
import { ethers } from "ethers";
import { useConnectionStatus, ConnectWallet } from "@thirdweb-dev/react";
import { toast } from "sonner";
import { prepareContractCall, resolveMethod } from "thirdweb";
import { listingContract } from "../../../lib/utils";
import { TransactionButton } from "thirdweb/react";

// import { useNavigate } from "react-router-dom";

const Listing = () => {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([""]);

  const [form, setForm] = useState({
    _propertyTitle: "",
    price: "",
    _description: "",
    _propertyAddress: "",
    _property_type: "",
    _property_spec: "",
    _square: "",
    _city: "",
    _country: "",
    listType: "",
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
          Authorization: `Bearer ${userJwt}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data.IpfsHash;
  };

  const handleSubmission = async () => {
    // Swal.fire({
    //   icon: "error",
    //   title: "Oops...",
    //   text: "You need to compleate your verification before you can list a property",
    //   footer: '<a href="/dashboard/verification">Verify you account</a>',
    // });

    try {
      const imageIPFSHashes = await Promise.all(images.map(uploadToIPFS));
      const transaction = prepareContractCall({
        contract: listingContract,
        method: resolveMethod("listProperty"),
        params: [
          {
            price: form.price.toString(),
            propertyTitle: form._propertyTitle,
            images: [...imageIPFSHashes],
            propertyAddress: form._propertyAddress,
            description: form._description,
            propertyType: form._property_type,
            propertySpec: form._property_spec.toString(),
            square: form._square.toString(),
            city: form._city,
            country: form._country,
            listType: form.listType,
          },
        ],
      });
      // const res = await axios.post(
      //   "https://proput-db.onrender.com/new_listing",
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       property_price: form.price,
      //       headline: form._propertyTitle,
      //       img_urls: imageIPFSHashes,
      //       room_spec: form._property_spec,
      //       description: form._description,
      //       id: decodedUser.id,
      //       square_ft: form._square,
      //       type: form._property_type,
      //       address: form._propertyAddress,
      //     }),
      //   }
      // );
      // if (!res) {
      //   throw new Error("property not uploaded to database");
      // }

      return transaction;
    } catch (error) {
      console.error("Error uploading images or sending transaction: ", error);
    }
  };

  const handleListingSuccessfull = async (trx) => {
    console.log(trx);
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
  };
  return (
    <div className="p-10">
      <Wrapper>
        <div className="flex gap-8  flex-wrap justify-center">
          {imageURLs.map((image, i) => (
            <UploadImage
              image={image}
              handleUpload={changeHandler}
              key={i}
              i={i}
            />
          ))}

          {images.length >= 1 && (
            <button onClick={handleAddImage} disabled={false}>
              Add Image
            </button>
          )}
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid w-full lg:w-2/3 items-center mx-auto gap-4 mt-10">
            <Label htmlFor="address" className="text-white text-2xl font-bold">
              Property Title
            </Label>
            <Input
              id="address"
              type="text"
              className="w-full mx-auto text-xLG p-3"
              autoComplete="off"
              onChange={(e) => handleFormChange("_propertyTitle", e)}
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
              onChange={(e) => handleFormChange("price", e)}
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
              onChange={(e) => handleFormChange("_propertyAddress", e)}
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
              required
              onChange={(e) => handleFormChange("_description", e)}
            />
          </div>

          <div className="mx-auto block mt-10 lg:w-2/3">
            <TransactionButton
              transaction={handleSubmission}
              // transaction={}
              onTransactionConfirmed={(trx) => {
                handleListingSuccessfull(trx);
              }}
              onError={(err) => {
                if (err.code == "4001") {
                  toast.error("Transaction rejected");
                } else {
                  toast.error(err.message);
                }
              }}
              style={{ background: "transparent", padding: 0 }}
            >
              <Button className="text-white px-12 bg-[#964CC3]">
                List Property
              </Button>
            </TransactionButton>
          </div>
        </form>
      </Wrapper>
    </div>
  );
};

export default Listing;

const UploadImage = ({ image, handleUpload, i }) => {
  return (
    <div className=" basis-[250px]">
      <div className="w-full h-[300px] bg-white grid place-items-center rounded-2xl">
        {image ? (
          <img
            src={image}
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
        className="hidden"
        type="file"
        id={`img-${i}`}
        accept="image/*"
        onChange={(e) => handleUpload(e, i)}
      />
      <Button
        className="w-full text-white font-bold text-base mt-5 rounded-lg"
        asChild
      >
        <label htmlFor={`img-${i}`} className="cursor-pointer">
          {image ? "Change Image" : "Upload Image"}
        </label>
      </Button>
    </div>
  );
};
