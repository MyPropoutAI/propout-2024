import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { toast } from "sonner";
import { cn } from "../../lib/utils";
import { useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import { PropertyType, ListType } from "../../lib/PropertyType";
import CurrencySymbol from "../../lib/CurrencySymbol";
import { Countries } from "../../lib/Countries";
import { UploadToCloudinary } from "../../components/UploadToCloudinary";
import { Rings } from "react-loader-spinner";
import { X } from "lucide-react";
import { Label } from "../../components/ui/label";
const ListProperty = () => {
  //const userJwt = import.meta.env.VITE_IPFS_JWT;

  // Initialize state with one empty slot
  const [mediaFiles, setMediaFiles] = useState([{ file: null, type: null }]);
  const [mediaURLs, setMediaURLs] = useState([""]);
  const [isLoading, setIsLoading] = useState(false);
  
  const user = useSelector((state) => state.auth.user);

  const decodedUser = jwt.decode(user);

  const userAvartar = decodedUser.name.substring(0, 2);

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
    _bathroom: "",
    _parking_space: "",
    isLand: false, // New state for isLand
    availability: [{ day: "", date: "", startTime: "", endTime: "" }],
  });

  const handleToggleLand = () => {
    setForm((prev) => ({ ...prev, isLand: !prev.isLand }));
  };

  // const handleFormChange = (fieldName, e) => {
  //   setForm({ ...form, [fieldName]: e.target.value });
  // };
  const handleFormChange = (fieldName, e) => {
    const value = e.target.value;

    // Check if the field is a numeric field (e.g., "price")
    if (fieldName === "price") {
      const rawValue = value.replace(/,/g, ""); // Remove existing commas
      const numericValue = rawValue.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas

      setForm({
        ...form,
        [fieldName]: numericValue, // Store the raw numeric value in state
      });

      e.target.value = formattedValue; // Update the input field with the formatted value
    } else {
      // For non-numeric fields, update the state directly
      setForm({
        ...form,
        [fieldName]: value,
      });
    }
  };
  const handleAvailabilityChange = (index, field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      availability: prevForm.availability.map((slot, i) =>
        i === index ? { ...slot, [field]: value } : slot
      ),
    }));
  };

  const addAvailabilitySlot = () => {
    setForm((prevForm) => ({
      ...prevForm,
      availability: [
        ...prevForm.availability,
        { day: "", date: "", startTime: "", endTime: "" },
      ],
    }));
  };

  const removeAvailabilitySlot = (index) => {
    setForm((prevForm) => ({
      ...prevForm,
      availability: prevForm.availability.filter((_, i) => i !== index),
    }));
  };

  const handleDayChange = (day) => {
    setForm((prev) => {
      const days = prev.availability.days.includes(day)
        ? prev.availability.days.filter((d) => d !== day)
        : [...prev.availability.days, day];
      return { ...prev, availability: { ...prev.availability, days } };
    });
  };

  const handleUploadImages = async () => {
    try {
      const validFiles = mediaFiles.filter((media) => media.file !== null);
      if (validFiles.length === 0) {
        alert("Please select media files to upload");
        return;
      }

      const uploadPromises = validFiles.map(async (media) => {
        try {
          const uploadedData = await UploadToCloudinary(media.file);
          return uploadedData;
        } catch (uploadError) {
          console.error("Media upload error:", uploadError);
          return null;
        }
      });

      const uploadResults = await Promise.all(uploadPromises);
      const cloudinaryUrls = uploadResults
        .filter((result) => result !== null)
        .map((result) => result.secure_url);

      return cloudinaryUrls;
    } catch (error) {
      console.error("Upload process error:", error);
      alert("Failed to upload media files");
    }
  };

  const changeHandler = (event, index) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileType = file.type.split("/")[0]; // 'image' or 'video'

      const newMediaFiles = [...mediaFiles];
      newMediaFiles[index] = {
        file: file,
        type: fileType,
      };
      setMediaFiles(newMediaFiles);

      const newMediaURLs = [...mediaURLs];
      newMediaURLs[index] = URL.createObjectURL(file);
      setMediaURLs(newMediaURLs);
    }
  };

  // Add a new loading state for deletion
  const [deletingIndex, setDeletingIndex] = useState(null);

  // Update the removeMedia function to handle loading state
  const removeMedia = async (index) => {
    setDeletingIndex(index);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newMediaFiles = mediaFiles.filter((_, i) => i !== index);
      const newMediaURLs = mediaURLs.filter((_, i) => i !== index);

      if (newMediaFiles.length === 0) {
        newMediaFiles.push({ file: null, type: null });
        newMediaURLs.push("");
      }

      setMediaFiles(newMediaFiles);
      setMediaURLs(newMediaURLs);
    } catch (error) {
      console.error("Error removing media:", error);
      toast("Error", {
        description: "Failed to remove media",
      });
    } finally {
      setDeletingIndex(null);
    }
  };

  const handleAddMedia = () => {
    setMediaFiles([...mediaFiles, { file: null, type: null }]);
    setMediaURLs([...mediaURLs, ""]);
  };

  // Add this computed value
  const hasValidAvailability = form.availability.some(
    (slot) => slot.day && slot.date && slot.startTime && slot.endTime
  );

  const handleSubmission = async () => {
    if (!hasValidAvailability) {
      toast.error("Please set your availability", {
        description: "You must set at least one availability slot before listing a property"
      });
      return;
    }

    setIsLoading(true);
    try {
      const imagesUri = await handleUploadImages();
      //console.log("this is the updated image url", imagesUri);

      // Check if cloudinaryImageUrls is empty
      if (imagesUri.length === 0) {
        setIsLoading(false);
        toast("Error", {
          description: "No images uploaded. Please try again.",
        });
        return;
      }

      const res = await fetch(
        "https://proput-db-4vtf.onrender.com/new_listing",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            property_price: form.price,
            headline: form._propertyTitle,
            img_urls: imagesUri,
            room_spec: form._property_spec,
            description: form._description,
            id: decodedUser.id,
            square_ft: form._square,
            type: form._property_type,
            address: form._propertyAddress,
            city: form._city,
            country: form._country,
            listType: form.listType,
            bathroom: form._bathroom,
            isLand: form.isLand,
            inspection_availability: form.availability,
            parking_space: form._parking_space,
          }),
        }
      );

      if (!res.ok) {
        setIsLoading(false);
        toast("Error", {
          description: "Failed to list property",
        });
        throw new Error("Property not uploaded to database");
      }
      setIsLoading(false);
      toast("Success", {
        description: "Your property has been listed successfully",
      });
      return res;
    } catch (error) {
      setIsLoading(false);
      toast("Error", {
        description: "Error uploading images or sending transaction.",
      });
      //console.error("Error uploading images or sending transaction: ", error);
    }
  };

  // const handleListingSuccessfull = async (trx) => {

  // };

  return (
    <div className="bg-white p-8 rounded-md max-w-full">
      <div className="flex items-center mb-4">
        <label className="mr-2">Is this a land property?</label>
        <input
          type="checkbox"
          checked={form.isLand}
          onChange={handleToggleLand}
        />
      </div>
      <p className="text-gray py-2">
        Please ensure your video is not more than one minute long
      </p>
      <div className="border-2 p-4 rounded-md flex gap-5 relative">
        <div className="flex gap-4 overflow-x-auto">
          {mediaURLs.map((url, i) => (
            <UploadMedia
              image={url}
              handleUpload={changeHandler}
              mediaFiles={mediaFiles}
              onRemove={removeMedia}
              isDeleting={deletingIndex === i}
              key={i}
              i={i}
            />
          ))}
        </div>
        <div
          className="absolute right-0 top-0 bg-white h-full p-6 flex place-items-center cursor-pointer shadow-2xl"
          onClick={handleAddMedia}
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
            {form.isLand ? (
              <>
                <div>
                  <Input
                    type="text"
                    placeholder="Land Title"
                    className="w-full texl-lg"
                    onChange={(e) => handleFormChange("_propertyTitle", e)}
                  />
                </div>
                <div>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={(e) => handleFormChange("listType", e)}
                  >
                    <option value="1" hidden>
                      List Type
                    </option>
                    {ListType.map((type, i) => (
                      <option key={i} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Input
                    type="text" // Change to text to allow commas
                    placeholder="Property Price"
                    className="w-full text-lg"
                    onChange={(e) => handleFormChange("price", e)}
                    value={form.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} // Display formatted value
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="Square Feet"
                    className="w-full texl-lg"
                    onChange={(e) => handleFormChange("_square", e)}
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
                  <Input
                    type="text"
                    placeholder="City"
                    className="w-full texl-lg"
                    onChange={(e) => handleFormChange("_city", e)}
                  />
                </div>
                <div>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={(e) => handleFormChange("_country", e)}
                  >
                    <option value="1">Country</option>
                    {Countries.map((country, i) => (
                      <option key={i} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Input
                    type="text"
                    placeholder="Headline"
                    className="w-full texl-lg"
                    onChange={(e) => handleFormChange("_propertyTitle", e)}
                  />
                </div>
                <div>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={(e) => handleFormChange("listType", e)}
                  >
                    <option value="1" hidden>
                      List Type
                    </option>
                    {ListType.map((type, i) => (
                      <option key={i} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    onChange={(e) => handleFormChange("_property_type", e)}
                  >
                    <option value="1">Property Type</option>
                    {PropertyType.map((type, i) => (
                      <option key={i} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Input
                    type="text" // Change to text to allow commas
                    placeholder="Property Price"
                    className="w-full text-lg"
                    onChange={(e) => handleFormChange("price", e)}
                    value={form.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} // Display formatted value
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
                  <Input
                    type="text"
                    placeholder="City"
                    className="w-full texl-lg"
                    onChange={(e) => handleFormChange("_city", e)}
                  />
                </div>
                <div>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={(e) => handleFormChange("_country", e)}
                  >
                    <option value="1">Country</option>
                    {Countries.map((country, i) => (
                      <option key={i} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="Bedroom"
                    className="w-full texl-lg"
                    onChange={(e) => handleFormChange("_property_spec", e)}
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="Bathroom"
                    className="w-full texl-lg"
                    onChange={(e) => handleFormChange("_bathroom", e)}
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="parking space"
                    className="w-full texl-lg"
                    onChange={(e) => handleFormChange("_parking_space", e)}
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="Square foot"
                    className="w-full texl-lg"
                    onChange={(e) => handleFormChange("_square", e)}
                  />
                </div>
              </>
            )}
            <div>
              <Textarea
                type="text"
                placeholder="Description"
                className="w-full texl-lg min-h-40"
                onChange={(e) => handleFormChange("_description", e)}
              />
            </div>
            <div>
              <h3 className="font-bold mb-2">Availability for Inspection:</h3>
              {form.availability.map((slot, index) => (
                <div
                  key={index}
                  className="flex flex-wrap items-center gap-2 mb-4 p-4 border rounded-md relative"
                >
                  <select
                    className="flex-1 h-10 min-w-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={slot.day}
                    onChange={(e) =>
                      handleAvailabilityChange(index, "day", e.target.value)
                    }
                  >
                    <option value="">Select Day</option>
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>

                  <div>
                    <Label>Date (optional)</Label>
                    <Input
                      type="date"
                      value={slot.date}
                      onChange={(e) =>
                        handleAvailabilityChange(index, "date", e.target.value)
                      }
                      className="flex-1 min-w-[120px]"
                    />
                  </div>
                  <Input
                    type="time"
                    value={slot.startTime}
                    onChange={(e) =>
                      handleAvailabilityChange(
                        index,
                        "startTime",
                        e.target.value
                      )
                    }
                    className="flex-1 min-w-[120px]"
                  />
                  <Input
                    type="time"
                    value={slot.endTime}
                    onChange={(e) =>
                      handleAvailabilityChange(index, "endTime", e.target.value)
                    }
                    className="flex-1 min-w-[120px]"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeAvailabilitySlot(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addAvailabilitySlot}
                className="mt-2"
              >
                Add Availability Slot
              </Button>
            </div>
            <div>
              <Button
                className={cn(
                  "text-white px-12",
                  hasValidAvailability 
                    ? "bg-[#964CC3] hover:bg-[#8744B0]" 
                    : "bg-gray-400 cursor-not-allowed"
                )}
                onClick={handleSubmission}
                disabled={isLoading || !hasValidAvailability}
              >
                {isLoading ? (
                  <Rings
                    visible={true}
                    height="40"
                    width="40"
                    color="#FFF"
                    ariaLabel="rings-loading"
                  />
                ) : (
                  "List Property"
                )}
              </Button>
              {!hasValidAvailability && (
                <p className="text-red-500 text-sm mt-2">
                  Please set your availability before listing the property
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex-[2]">
          <div className="bg-[#EBEBEB] rounded-lg">
            <p className="pt-5 text-center font-bold text-lg text-[#320051]">
              PREVIEW
            </p>
            <div className="p-3">
              <div className="h-[250px] bg-[#DDE1E6] mt-5 relative overflow-hidden">
                <span
                  className={cn(
                    "absolute py-2 px-5 top-0 right-0 bg-[#0EFC25] text-white font-semibold",
                    form.listType == "Sell" ? "bg-blue-900" : "bg-[#0EFC25]"
                  )}
                >
                  {form.listType.toLocaleUpperCase()}
                </span>
                {mediaFiles[0]?.type === "video" ? (
                  <video
                    src={mediaURLs[0]}
                    className="h-full object-cover object-top w-full"
                    controls
                    controlsList="nodownload nofullscreen noremoteplayback"
                  />
                ) : (
                  <img
                    src={mediaURLs[0]}
                    alt="Preview"
                    className="h-full object-cover object-top w-full"
                  />
                )}
              </div>
              <div className="bg-white p-5">
                <p className="text-lg text-[#FF0606]">
                  <CurrencySymbol
                    amount={form.price.replace(/,/g, "")}
                    listType={form.listType.toLocaleUpperCase()}
                  />
                </p>
                <p className="my-3 font-bold text-xl">{form._propertyTitle}</p>
                <p>{form._description}</p>
                <div className="flex items-center justify-between my-5">
                  <div className="text-center">
                    <p>{form._property_spec || 0}</p>
                    <p>Bedroom</p>
                  </div>
                  <div className="text-center">
                    <p>{form._property_type}</p>
                    <p>Type</p>
                  </div>
                  <div className="text-center">
                    <p>{form._square || 0}</p>
                    <p>Square</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full border flex justify-center items-center">
                      <h1 className="text-center font-semibold ">
                        {userAvartar}
                      </h1>
                    </div>
                    <div>
                      <p className="font-bold">{decodedUser.name}</p>
                      <p className="text-sm">Estate agent</p>
                    </div>
                  </div>
                  {/* <Button className="rounded-md text-white px-8 bg-[#964CC3]">
                        See more
                      </Button> */}
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

const UploadMedia = ({
  image,
  handleUpload,
  i,
  mediaFiles,
  onRemove,
  isDeleting,
}) => {
  const mediaType = mediaFiles[i]?.type;

  return (
    <div className="relative w-36 aspect-square md:min-w-48">
      <div className="w-full aspect-square bg-[#F2F4F8] grid place-items-center rounded-2xl">
        {image ? (
          <>
            {mediaType === "video" ? (
              <video
                src={image}
                className="w-full h-[250px] max-h-[250px] object-cover object-center"
                controls
              />
            ) : (
              <img
                src={image}
                alt="Uploaded Media"
                className="w-full h-[250px] max-h-[250px] object-cover object-center"
              />
            )}
            <button
              onClick={() => onRemove(i)}
              disabled={isDeleting}
              className="absolute top-2 right-2 z-10 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 disabled:opacity-50"
            >
              {isDeleting ? (
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "×"
              )}
            </button>
          </>
        ) : (
          <img src="/images/image-upload.svg" alt="" className="w-1/2" />
        )}
      </div>
      <input
        className="hidden"
        type="file"
        id={`media-${i}`}
        accept="image/*,video/*"
        onChange={(e) => handleUpload(e, i)}
      />
      <label
        htmlFor={`media-${i}`}
        className="cursor-pointer absolute inset-0 appearance-none"
      ></label>
    </div>
  );
};
