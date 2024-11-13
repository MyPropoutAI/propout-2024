export const UploadToCloudinary = async (rawImage) => {
  const formData = new FormData();
  formData.append("file", rawImage);
  formData.append("upload_preset", "propout"); // Replace with your Cloudinary preset
  // upload image
  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dttqyhyv5/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      console.log("Failed to upload image to cloud");
    }
    const imageData = await response.json();
    console.log("Image uploaded:", imageData);
    return imageData;
  } catch (error) {
    console.log(error);
  }
};
