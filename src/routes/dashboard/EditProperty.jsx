import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { useUpdateProperty } from "../../contexts/hooks/useUpdateProperty";
import { usePropertyDetails } from "../../contexts/hooks/useGetOneUserProperties";

const EditProperty = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const decodedUser = jwt.decode(user);

  const { handleUpdateProperty, isLoading: isUpdating } = useUpdateProperty();
  const { data: propertyData, isLoading: isLoadingProperty } =
    usePropertyDetails(decodedUser?.id);

  // States similar to ListProperty component
  const [mediaFiles, setMediaFiles] = useState([{ file: null, type: null }]);
  const [mediaURLs, setMediaURLs] = useState([""]);
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
    isLand: false,
    availability: [{ day: "", date: "", startTime: "", endTime: "" }],
  });

  // Load existing property data
  useEffect(() => {
    if (propertyData?.data?.listing) {
      const property = propertyData.data.listing.find(
        (p) => p.id === Number(propertyId)
      );

      if (property) {
        setForm({
          _propertyTitle: property.headline || "",
          price: property.property_price || "",
          _description: property.description || "",
          _propertyAddress: property.address || "",
          _property_type: property.type || "",
          _property_spec: property.room_spec || "",
          _square: property.square_ft || "",
          _city: property.city || "",
          _country: property.country || "",
          listType: property.list_type || "",
          _bathroom: property.bathroom || "",
          _parking_space: property.parking_space || "",
          isLand: property.isLand || false,
          availability: property.inspection_availability || [
            { day: "", date: "", startTime: "", endTime: "" },
          ],
        });

        // Set media URLs
        if (property.img_urls) {
          const urls = property.img_urls.split(", ");
          setMediaURLs(urls);
          setMediaFiles(
            urls.map((url) => ({ file: null, type: "image", url }))
          );
        }
      }
    }
  }, [propertyData, propertyId]);

  // Handle form changes
  const handleFormChange = (fieldName, e) => {
    const value = e.target.value;

    if (fieldName === "price") {
      const rawValue = value.replace(/,/g, ""); // Remove existing commas
      const numericValue = rawValue.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas

      setForm({
        ...form,
        [fieldName]: numericValue, // Store the raw numeric value in state
      });

      // Update the input field with the formatted value
      e.target.value = formattedValue;
    } else {
      setForm({
        ...form,
        [fieldName]: value,
      });
    }
  };

  // Handle media upload
  const handleUpload = (e, index) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileType = file.type.split("/")[0];

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

  // Handle media removal
  const handleRemoveMedia = (index) => {
    const newMediaFiles = [...mediaFiles];
    const newMediaURLs = [...mediaURLs];

    newMediaFiles.splice(index, 1);
    newMediaURLs.splice(index, 1);

    if (newMediaFiles.length === 0) {
      newMediaFiles.push({ file: null, type: null });
      newMediaURLs.push("");
    }

    setMediaFiles(newMediaFiles);
    setMediaURLs(newMediaURLs);
  };

  // Handle form submission
  const handleSubmission = async () => {
    try {
      // Upload new images if any
      let imagesUri = [];
      const newMediaFiles = mediaFiles.filter((media) => media.file);

      if (newMediaFiles.length > 0) {
        const uploadPromises = newMediaFiles.map((media) =>
          UploadToCloudinary(media.file)
        );
        const uploadResults = await Promise.all(uploadPromises);
        imagesUri = uploadResults.map((result) => result.secure_url);
      }

      // Combine existing and new image URLs
      const existingUrls = mediaFiles
        .filter((media) => !media.file && media.url)
        .map((media) => media.url);

      const allImageUrls = [...existingUrls, ...imagesUri].join(", ");

      // Prepare update data
      const updateData = {
        property_price: form.price.replace(/,/g, ""),
        headline: form._propertyTitle,
        img_urls: allImageUrls,
        room_spec: form._property_spec,
        description: form._description,
        square_ft: form._square,
        type: form._property_type,
        address: form._propertyAddress,
        city: form._city,
        country: form._country,
        list_type: form.listType,
        bathroom: form._bathroom,
        isLand: form.isLand,
        inspection_availability: form.availability,
        parking_space: form._parking_space,
      };

      await handleUpdateProperty({
        propertyData: updateData,
        propertyId: Number(propertyId),
        userId: decodedUser.id,
      });

      navigate("/dashboard/properties");
    } catch (error) {
      toast.error("Failed to update property", {
        description: error.message,
      });
    }
  };

  if (isLoadingProperty) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Rings />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-[3]">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Edit Property</h2>

            {/* Property Details Form */}
            <div className="space-y-6">
              {/* Title */}
              <div>
                <Label>Property Title</Label>
                <Input
                  value={form._propertyTitle}
                  onChange={(e) => handleFormChange("_propertyTitle", e)}
                  placeholder="Enter property title"
                />
              </div>

              {/* Price */}
              <div>
                <Label>Price</Label>
                <Input
                  value={form.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  onChange={(e) => handleFormChange("price", e)}
                  placeholder="Enter price"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Description */}
              <div>
                <Label>Description</Label>
                <Textarea
                  value={form._description}
                  onChange={(e) => handleFormChange("_description", e)}
                  placeholder="Enter property description"
                />
              </div>

              {/* Property Address */}
              <div>
                <Label>Property Address</Label>
                <Input
                  value={form._propertyAddress}
                  onChange={(e) => handleFormChange("_propertyAddress", e)}
                  placeholder="Enter property address"
                />
              </div>

              {/* Property Type */}
              <div>
                <Label>Property Type</Label>
                <select
                  value={form._property_type}
                  onChange={(e) => handleFormChange("_property_type", e)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Type</option>
                  {PropertyType.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* List Type */}
              <div>
                <Label>List Type</Label>
                <select
                  value={form.listType}
                  onChange={(e) => handleFormChange("listType", e)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select List Type</option>
                  {ListType.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Room Specifications */}
              <div>
                <Label>Number of Bedrooms</Label>
                <Input
                  type="number"
                  value={form._property_spec}
                  onChange={(e) => handleFormChange("_property_spec", e)}
                  placeholder="Enter number of bedrooms"
                />
              </div>

              {/* Bathrooms */}
              <div>
                <Label>Number of Bathrooms</Label>
                <Input
                  type="number"
                  value={form._bathroom}
                  onChange={(e) => handleFormChange("_bathroom", e)}
                  placeholder="Enter number of bathrooms"
                />
              </div>

              {/* Square Footage */}
              <div>
                <Label>Square Footage</Label>
                <Input
                  type="number"
                  value={form._square}
                  onChange={(e) => handleFormChange("_square", e)}
                  placeholder="Enter square footage"
                />
              </div>

              {/* Parking Space */}
              <div>
                <Label>Parking Spaces</Label>
                <Input
                  type="number"
                  value={form._parking_space}
                  onChange={(e) => handleFormChange("_parking_space", e)}
                  placeholder="Enter number of parking spaces"
                />
              </div>

              {/* City */}
              <div>
                <Label>City</Label>
                <Input
                  value={form._city}
                  onChange={(e) => handleFormChange("_city", e)}
                  placeholder="Enter city"
                />
              </div>

              {/* Country */}
              <div>
                <Label>Country</Label>
                <select
                  value={form._country}
                  onChange={(e) => handleFormChange("_country", e)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Country</option>
                  {Countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Is Land Toggle */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isLand"
                  checked={form.isLand}
                  onChange={(e) =>
                    setForm({ ...form, isLand: e.target.checked })
                  }
                  className="rounded border-gray-300"
                />
                <Label htmlFor="isLand">Is this a land property?</Label>
              </div>

              {/* Availability Schedule */}
              <div>
                <Label>Inspection Availability</Label>
                {form.availability.map((slot, index) => (
                  <div key={index} className="flex gap-2 items-center mb-2">
                    <Input
                      type="date"
                      value={slot.date}
                      onChange={(e) =>
                        handleFormChange(`availability.${index}.date`, {
                          target: { value: e.target.value },
                        })
                      }
                      className="flex-1"
                    />
                    <Input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) =>
                        handleFormChange(`availability.${index}.startTime`, {
                          target: { value: e.target.value },
                        })
                      }
                      className="flex-1"
                    />
                    <Input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) =>
                        handleFormChange(`availability.${index}.endTime`, {
                          target: { value: e.target.value },
                        })
                      }
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newAvailability = [...form.availability];
                        newAvailability.splice(index, 1);
                        setForm({ ...form, availability: newAvailability });
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setForm({
                      ...form,
                      availability: [
                        ...form.availability,
                        { day: "", date: "", startTime: "", endTime: "" },
                      ],
                    })
                  }
                  className="mt-2"
                >
                  Add Availability Slot
                </Button>
              </div>

              {/* Media Upload */}
              <div>
                <Label>Property Images</Label>
                <div className="flex flex-wrap gap-4">
                  {mediaFiles.map((media, index) => (
                    <div key={index} className="relative">
                      {media.file || media.url ? (
                        <div className="relative w-32 h-32">
                          <img
                            src={mediaURLs[index] || media.url}
                            alt={`Property ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            onClick={() => handleRemoveMedia(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer">
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleUpload(e, index)}
                            accept="image/*"
                          />
                          <span className="text-gray-500">+ Add Image</span>
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmission}
                disabled={isUpdating}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isUpdating ? (
                  <Rings color="white" height={20} width={20} />
                ) : (
                  "Update Property"
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="flex-[2]">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Preview</h2>
            <div className="space-y-4">
              <img
                src={mediaURLs[0] || "/placeholder-image.jpg"}
                alt="Property Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold">{form._propertyTitle}</h3>
              <p className="text-gray-600">{form._description}</p>
              <div className="text-xl font-bold text-purple-600">
                <CurrencySymbol amount={form.price} listType={form.listType} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProperty;
