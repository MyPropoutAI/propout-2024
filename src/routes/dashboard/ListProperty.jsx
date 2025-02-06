import { useState, useCallback } from "react";
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
import { Rings } from "react-loader-spinner";
import { X } from "lucide-react";
import { Label } from "../../components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import UploadMedia from "../../components/UploadMedia";
import { handleUploadMedia } from "../../lib/fileUpload";

const ListProperty = () => {
  const [mediaFiles, setMediaFiles] = useState([
    {
      id: crypto.randomUUID(),
      file: null,
      type: null,
      previewUrl: "",
      finalUrl: "",
    },
  ]);
  // const [mediaURLs, setMediaURLs] = useState([""]);
  const [isLoading, setIsLoading] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [deletingIndex, setDeletingIndex] = useState(null);

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
    isLand: false,
    availability: [{ day: "", date: "", startTime: "", endTime: "" }],
  });

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

  const handleFileSelect = useCallback(async (event, index) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setMediaFiles((prev) => {
        const newFiles = [...prev];
        // Clean up previous preview URL if it exists
        if (newFiles[index]?.previewUrl?.startsWith("blob:")) {
          URL.revokeObjectURL(newFiles[index].previewUrl);
        }

        // Create new preview URL and wait for it to be ready
        const reader = new FileReader();
        reader.onload = (e) => {
          const previewUrl = URL.createObjectURL(file);
          const mediaType = file.type.startsWith("video/") ? "video" : "image";

          console.log("File selected:", {
            file,
            type: file.type,
            mediaType,
            previewUrl,
            dataUrl: e.target.result,
          });

          setMediaFiles((current) => {
            const updatedFiles = [...current];
            updatedFiles[index] = {
              file,
              id: crypto.randomUUID(),
              type: file.type,
              mediaType,
              name: file.name,
              size: file.size,
              previewUrl,
              finalUrl: "",
              dataUrl: e.target.result, // Keep a data URL as backup
            };
            return updatedFiles;
          });
        };
        reader.readAsDataURL(file);

        // Return a temporary state while the FileReader processes
        return newFiles.map((f, i) =>
          i === index
            ? {
                ...f,
                file,
                type: file.type,
                mediaType: file.type.startsWith("video/") ? "video" : "image",
                name: file.name,
                size: file.size,
              }
            : f
        );
      });
    } catch (error) {
      console.error("Error creating preview:", error);
      toast.error("Failed to create file preview");
    }
  }, []);

  const handleUploadComplete = useCallback((url, index) => {
    setMediaFiles((prev) => {
      const newFiles = [...prev];
      newFiles[index] = {
        ...newFiles[index],
        finalUrl: url,
      };
      return newFiles;
    });
  }, []);

  // Generate unique IDs for new media slots
  const handleAddMedia = useCallback(() => {
    setMediaFiles((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        file: null,
        type: null,
        previewUrl: "",
        finalUrl: "",
      },
    ]);
  }, []);

  const handleRemoveMedia = useCallback(
    async (index) => {
      setDeletingIndex(index);
      try {
        setMediaFiles((prev) => {
          const newFiles = prev.filter((_, i) => i !== index);
          return newFiles.length > 0
            ? newFiles
            : [
                {
                  id: crypto.randomUUID(),
                  file: null,
                  type: null,
                  previewUrl: "",
                  finalUrl: "",
                },
              ];
        });

        if (mediaFiles[index]?.previewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(mediaFiles[index].previewUrl);
        }
      } finally {
        setDeletingIndex(null);
      }
    },
    [mediaFiles]
  );

  const handleUploadImages = async () => {
    try {
      const validFiles = mediaFiles.filter((media) => media.file !== null);
      if (validFiles.length === 0) {
        toast("Error", { description: "Please select media files to upload" });
        return [];
      }

      // Map the files to the correct format expected by handleUploadMedia
      const filesToUpload = validFiles.map((media) => ({
        file: media.file,
        id: media.id,
        type: media.type,
        name: media.file.name,
        size: media.file.size,
      }));

      const results = await handleUploadMedia({
        mediaFiles: filesToUpload,
        onProgress: (uploads) => {
          const total = uploads.reduce((sum, u) => sum + u.progress, 0);
          setOverallProgress(total / uploads.length);
        },
        onComplete: (results) => {
          setMediaFiles((prev) =>
            prev.map((media) => {
              const result = results.find((r) => r.id === media.id);
              return result ? { ...media, finalUrl: result.result } : media;
            })
          );
          return results.map((r) => r.result);
        },
      });

      return results.map((r) => r.result);
    } catch (error) {
      setUploadError(error.message);
      throw error;
    }
  };

  const handleSubmission = async () => {
    setIsLoading(true);
    try {
      const imagesUri = await handleUploadImages();
      //console.log("db image url", imagesUri);

      const res = await fetch(
        "https://proput-db-4vtf.onrender.com/new_listing",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            headline: form._propertyTitle,
            property_price: form.price.replace(/,/g, ""),
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

      if (!res.ok) throw new Error("Property upload failed");
      toast("Success", { description: "Property listed successfully" });
    } catch (error) {
      toast("Error", { description: error.message });
    } finally {
      setIsLoading(false);
    }
  };
  // Handle media removal with cleanup
  // const handleRemoveMedia = async (index) => {
  //   setDeletingIndex(index);
  //   try {
  //     const newMediaFiles = mediaFiles.filter((_, i) => i !== index);
  //     const newMediaURLs = mediaURLs.filter((_, i) => i !== index);

  //     if (newMediaFiles.length === 0) {
  //       newMediaFiles.push({ id: crypto.randomUUID(), file: null, type: null });
  //       newMediaURLs.push("");
  //     }

  //     setMediaFiles(newMediaFiles);
  //     setMediaURLs(newMediaURLs);
  //     URL.revokeObjectURL(mediaURLs[index]);
  //   } finally {
  //     setDeletingIndex(null);
  //   }
  // };

  // const handleRemoveMedia = async (index) => {
  //   setDeletingIndex(index);
  //   try {
  //     setMediaFiles((prev) => {
  //       const newFiles = prev.filter((_, i) => i !== index);
  //       if (newFiles.length === 0) {
  //         return [
  //           {
  //             id: crypto.randomUUID(),
  //             file: null,
  //             type: null,
  //             previewUrl: "",
  //           },
  //         ];
  //       }
  //       return newFiles;
  //     });

  //     // Clean up object URL
  //     if (mediaFiles[index]?.previewUrl) {
  //       URL.revokeObjectURL(mediaFiles[index].previewUrl);
  //     }
  //   } finally {
  //     setDeletingIndex(null);
  //   }
  // };

  // Handle bulk media upload
  // const handleUploadImages = async () => {
  //   try {
  //     const validFiles = mediaFiles.filter((media) => media.file !== null);
  //     if (validFiles.length === 0) {
  //       toast("Error", { description: "Please select media files to upload" });
  //       return [];
  //     }

  //     const results = await handleUploadMedia({
  //       mediaFiles: validFiles,
  //       onProgress: (uploads) => {
  //         const total = uploads.reduce((sum, u) => sum + u.progress, 0);
  //         setOverallProgress(total / uploads.length);
  //       },
  //       onComplete: (results) => {
  //         // Update preview URLs with Cloudinary URLs
  //         setMediaURLs((prev) => {
  //           const newURLs = [...prev];
  //           results.forEach(({ id, result }) => {
  //             const index = mediaFiles.findIndex((m) => m.id === id);
  //             if (index !== -1) newURLs[index] = result;
  //           });
  //           return newURLs;
  //         });
  //         return results.map((r) => r.result);
  //       },
  //     });

  //     return results.map((r) => r.result);
  //   } catch (error) {
  //     setUploadError(error.message);
  //     throw error;
  //   }
  // };

  // const handleUploadImages = async () => {
  //   try {
  //     // Get files that actually have content
  //     const validFiles = mediaFiles.filter((media) => media.file !== null);

  //     if (validFiles.length === 0) {
  //       toast("Error", { description: "Please select media files to upload" });
  //       return [];
  //     }

  //     // Start the upload process
  //     const results = await handleUploadMedia({
  //       mediaFiles: validFiles,
  //       onProgress: (uploads) => {
  //         // Calculate total progress across all uploads
  //         const totalProgress =
  //           uploads.reduce((sum, u) => sum + u.progress, 0) / uploads.length;

  //         setOverallProgress(totalProgress);
  //       },
  //       onComplete: (uploadResults) => {
  //         // Update mediaFiles with Cloudinary URLs
  //         setMediaFiles((prev) => {
  //           return prev.map((media) => {
  //             // Find matching upload result
  //             const result = uploadResults.find((r) => r.id === media.id);
  //             // Only update if we have a result and it's the same file
  //             if (result && media.file !== null) {
  //               return {
  //                 ...media,
  //                 previewUrl: result.result, // Cloudinary URL
  //               };
  //             }
  //             return media;
  //           });
  //         });

  //         // Return just the URLs for submission
  //         return uploadResults.map((r) => r.result);
  //       },
  //     });

  //     // Return the final Cloudinary URLs
  //     return results;
  //   } catch (error) {
  //     setUploadError(error.message);
  //     toast("Error", { description: error.message });
  //     return [];
  //   }
  // };
  // Handle form submission
  // const handleSubmission = async () => {
  //   setIsLoading(true);
  //   try {
  //     const imagesUri = await handleUploadImages();

  //     const res = await fetch(
  //       "https://proput-db-4vtf.onrender.com/new_listing",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           ...form,
  //           property_price: form.price.replace(/,/g, ""),
  //           img_urls: imagesUri,
  //           id: decodedUser.id,
  //         }),
  //       }
  //     );

  //     if (!res.ok) throw new Error("Property upload failed");

  //     toast("Success", { description: "Property listed successfully" });
  //   } catch (error) {
  //     toast("Error", { description: error.message });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Render media upload section
  const renderMediaUpload = () => (
    <div className="border-2 p-4 rounded-md flex gap-5 relative">
      <div className="flex gap-4 overflow-x-auto">
        {mediaFiles.map((media, index) => (
          <UploadMedia
            key={media.id}
            index={index}
            previewUrl={media.previewUrl}
            finalUrl={media.finalUrl}
            mediaType={media.mediaType}
            onFileSelect={(e) => handleFileSelect(e, index)}
            onUploadComplete={(url) => handleUploadComplete(url, index)}
            onRemove={() => handleRemoveMedia(index)}
            isDeleting={deletingIndex === index}
          />
        ))}
      </div>

      <div
        className="absolute right-0 top-0 bg-white h-full p-6 flex place-items-center cursor-pointer shadow-2xl"
        onClick={handleAddMedia}
      >
        <img
          src="/images/Add Image.svg"
          alt="Add media"
          className="w-10 aspect-square lg:w-14"
        />
      </div>
    </div>
  );

  return (
    <div className="bg-white p-8 rounded-md max-w-full">
      <div className="flex items-center mb-4">
        <label className="mr-2">Is this a land property?</label>
        <input
          type="checkbox"
          checked={form.isLand}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, isLand: e.target.checked }))
          }
        />
      </div>

      <div className="mb-8">
        <p className="text-gray-500 mb-4">
          Please ensure your video is not more than one minute long
        </p>
        {renderMediaUpload()}
        {overallProgress > 0 && (
          <div className="mt-4">
            <Progress value={overallProgress} className="w-full" />
            <p className="text-sm text-gray-600 mt-1">
              Upload progress: {Math.round(overallProgress)}%
            </p>
          </div>
        )}
        {uploadError && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{uploadError}</AlertDescription>
          </Alert>
        )}
      </div>

      {/* Rest of the form components remain the same */}
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
                className="text-white px-12 bg-[#964CC3] hover:bg-[#8744B0]"
                onClick={handleSubmission}
                disabled={isLoading}
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
                    "absolute py-2 px-5 top-0 right-0 bg-[#0EFC25] text-white font-semibold z-10",
                    form.listType == "Sell" ? "bg-blue-900" : "bg-[#0EFC25]"
                  )}
                >
                  {form.listType.toLocaleUpperCase()}
                </span>
                {mediaFiles[0]?.mediaType === "video" ? (
                  <div className="relative w-full h-full">
                    <video
                      key={mediaFiles[0]?.finalUrl || mediaFiles[0]?.previewUrl}
                      src={mediaFiles[0]?.finalUrl || mediaFiles[0]?.previewUrl}
                      className="absolute inset-0 w-full h-full object-cover"
                      controls
                      playsInline
                      controlsList="nodownload"
                      disablePictureInPicture
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={
                        mediaFiles[0]?.finalUrl ||
                        mediaFiles[0]?.previewUrl ||
                        "/images/image-upload.svg"
                      }
                      alt="Preview"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
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
      {/* ... (keep existing form elements and preview section) ... */}

      {/* <Button
        className="text-white px-12 bg-[#964CC3] hover:bg-[#8744B0]"
        onClick={handleSubmission}
        disabled={isLoading}
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
      </Button> */}
    </div>
  );
};

export default ListProperty;
