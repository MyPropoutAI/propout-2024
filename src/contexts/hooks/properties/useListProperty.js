import axios from "axios";
import { listingContract } from "../../../lib/constants";
import { prepareContractCall } from "thirdweb";

const uploadToIPFS = async (file) => {
  const userJwt = import.meta.env.VITE_IPFS_JWT;
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

const method =
  "function listProperty((uint256 price, string propertyTitle, string[] images, string propertyAddress, string description, string propertyType, uint256 propertySpec, uint256 square, string city, string country, string listType) data) returns (uint256)";

export const useListProperty = async (form, decodedUser, images) => {
  try {
    const imageIPFSHashes = await Promise.all(images.map(uploadToIPFS));
    const transaction = prepareContractCall({
      contract: listingContract,
      method,
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
    const res = await fetch("https://proput-db.onrender.com/new_listing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        property_price: form.price,
        headline: form._propertyTitle,
        img_urls: imageIPFSHashes,
        room_spec: form._property_spec,
        description: form._description,
        id: decodedUser.id,
        square_ft: form._square,
        type: form._property_type,
        address: form._propertyAddress,
        city: form._city,
        country: form._country,
        listType: form.listType,
      }),
    });
    if (!res) {
      throw new Error("property not uploaded to database");
    }
    console.log(res, "uploaded data");

    return transaction;
  } catch (error) {
    console.error("Error uploading images or sending transaction: ", error);
  }
};
