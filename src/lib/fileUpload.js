import axios from "axios";

const UPLOAD_ERRORS = {
  NETWORK: "NETWORK_ERROR",
  TIMEOUT: "TIMEOUT_ERROR",
  FILE_SIZE: "FILE_SIZE_ERROR",
  FILE_TYPE: "FILE_TYPE_ERROR",
  CLOUDINARY: "CLOUDINARY_ERROR",
  UNKNOWN: "UNKNOWN_ERROR",
};

// Normalize MIME types and extensions
const normalizeMimeType = (mimeType) => mimeType.toLowerCase().trim();
const getFileExtension = (fileName) => fileName.split(".").pop().toLowerCase();

const FILE_CONFIG = {
  image: {
    maxSize: 10 * 1024 * 1024 * 1024, // 10GB
    types: [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/heic",
      "image/heif",
      "image/svg+xml",
    ].map(normalizeMimeType),
    minChunkSize: 5 * 1024 * 1024,
    maxChunkSize: 20 * 1024 * 1024,
    timeout: 60000,
    extensions: ["jpg", "jpeg", "png", "gif", "webp", "heic", "heif", "svg"],
  },
  video: {
    maxSize: 100 * 1024 * 1024 * 1024, // 100GB
    types: [
      "video/mp4",
      "video/quicktime",
      "video/webm",
      "video/x-m4v",
      "video/avi",
      "video/mpeg",
      "video/ogg",
    ].map(normalizeMimeType),
    minChunkSize: 5 * 1024 * 1024,
    maxChunkSize: 20 * 1024 * 1024,
    timeout: 120000,
    extensions: ["mp4", "mov", "webm", "m4v", "avi", "mpeg", "ogv"],
  },
};

const MIME_TYPE_FALLBACK = {
  // Image extensions
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  heic: "image/heic",
  heif: "image/heif",
  // Video extensions
  mov: "video/quicktime",
  m4v: "video/x-m4v",
  ogv: "video/ogg",
};

const getCloudinaryConfig = () => ({
  cloudName: "dttqyhyv5",
  uploadPreset: "propout",
  apiKey: "468958649223754",
  folder: "property_uploads",
  resourceType: "auto",
  multiple: true,
  maxFileSize: 10485760, // 10MB
  sources: ["local"],
  clientAllowedFormats: ["jpg", "jpeg", "png", "gif", "mp4", "mov", "webm"],
  maxImageWidth: 2000,
  maxImageHeight: 2000,
  maxVideoFileSize: 104857600, // 100MB for videos
  maxVideoLength: 60, // 60 seconds
});

const validateFile = (fileObj) => {
  // Check if fileObj has the required structure
  if (!fileObj || typeof fileObj !== "object") {
    throw new Error(
      `${UPLOAD_ERRORS.FILE_TYPE}: Invalid file object - object is null or undefined`
    );
  }

  // Get the file from the object
  const file = fileObj.file;
  if (!file || !(file instanceof File) || !file.type || !file.name) {
    throw new Error(
      `${UPLOAD_ERRORS.FILE_TYPE}: Invalid file object - missing required file properties`
    );
  }

  const normalizedType = normalizeMimeType(file.type);
  const extension = getFileExtension(file.name);

  // First try with official MIME type
  let typeCategory = Object.keys(FILE_CONFIG).find((category) =>
    FILE_CONFIG[category].types.includes(normalizedType)
  );

  // Fallback to extension mapping
  if (!typeCategory) {
    const fallbackMime = MIME_TYPE_FALLBACK[extension];
    if (fallbackMime) {
      typeCategory = Object.keys(FILE_CONFIG).find((category) =>
        FILE_CONFIG[category].types.includes(fallbackMime)
      );
    }
  }

  // Final fallback to configured extensions
  if (!typeCategory) {
    typeCategory = Object.keys(FILE_CONFIG).find((category) =>
      FILE_CONFIG[category].extensions.includes(extension)
    );
  }

  if (!typeCategory) {
    throw new Error(
      `${UPLOAD_ERRORS.FILE_TYPE}: Unsupported file type "${file.type}"` +
        ` for file "${file.name}". Supported types: ${Object.values(FILE_CONFIG)
          .map((c) => c.types.concat(c.extensions).join(", "))
          .join("; ")}`
    );
  }

  const config = FILE_CONFIG[typeCategory];
  if (file.size > config.maxSize) {
    throw new Error(
      `${UPLOAD_ERRORS.FILE_SIZE}: "${file.name}" exceeds maximum ${typeCategory} size ` +
        `of ${config.maxSize / (1024 * 1024 * 1024)}GB`
    );
  }

  return typeCategory;
};

const createChunks = (fileObj) => {
  const typeCategory = validateFile(fileObj);
  const config = FILE_CONFIG[typeCategory];
  const file = fileObj.file;

  const chunkSize = Math.min(
    config.maxChunkSize,
    Math.max(config.minChunkSize, Math.ceil(file.size / 20))
  );

  const chunks = [];
  let start = 0;

  while (start < file.size) {
    const end = Math.min(start + chunkSize, file.size);
    chunks.push({
      data: file.slice(start, end),
      index: chunks.length,
      start,
      end,
      size: end - start,
    });
    start = end;
  }

  return {
    chunks,
    totalChunks: chunks.length,
    fileType: typeCategory,
    uploadId: crypto.randomUUID(),
  };
};

const retryOperation = async (operation, maxRetries = 3, baseDelay = 1000) => {
  let attempts = 0;
  let lastError = null;

  while (attempts < maxRetries) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (!error.retryable) break;
      const delay = baseDelay * Math.pow(2, attempts);
      await new Promise((resolve) => setTimeout(resolve, delay));
      attempts++;
    }
  }
  throw lastError;
};

const uploadChunk = async (
  chunk,
  fileName,
  uploadId,
  chunkIndex,
  totalChunks,
  fileType,
  onProgress
) => {
  const config = getCloudinaryConfig();
  const timestamp = Math.round(Date.now() / 1000);
  const formData = new FormData();

  // Add required Cloudinary parameters
  formData.append("file", chunk.data);
  formData.append("upload_preset", config.uploadPreset);
  formData.append("api_key", config.apiKey);
  formData.append("timestamp", timestamp);
  formData.append("multiple", true);
  formData.append("resource_type", "auto");

  // Add chunking information
  if (totalChunks > 1) {
    formData.append("chunk_index", chunkIndex);
    formData.append("total_chunks", totalChunks);
  }

  // Add file identification - ensure consistent naming
  const publicId = `${uploadId}_${fileName}`;
  formData.append("public_id", publicId);
  formData.append("filename", fileName);

  try {
    const response = await axios.post(config.uploadUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Requested-With": "XMLHttpRequest",
      },
      timeout: FILE_CONFIG[fileType]?.timeout || 60000,
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const chunkProgress =
            (progressEvent.loaded / progressEvent.total) * 100;
          const overallProgress =
            totalChunks > 1
              ? ((chunkIndex + chunkProgress / 100) / totalChunks) * 100
              : chunkProgress;
          onProgress?.(chunkIndex, totalChunks, Math.round(overallProgress));
        }
      },
    });

    if (!response.data) {
      throw new Error("No response data from Cloudinary");
    }

    if (response.data.error) {
      throw new Error(`Cloudinary error: ${response.data.error.message}`);
    }

    // Return the secure_url if available
    return response.data.secure_url || response.data;
  } catch (error) {
    console.error("Upload error details:", {
      error: error.message,
      response: error.response?.data,
      status: error.response?.status,
      chunk: {
        index: chunkIndex,
        total: totalChunks,
        size: chunk.size,
      },
    });

    const errorData = {
      message:
        error.response?.data?.error?.message ||
        error.message ||
        "Upload chunk failed",
      retryable: error.response?.status >= 500 || !error.response,
      details: error.response?.data,
    };

    throw errorData;
  }
};

const handleUploadMedia = async ({
  mediaFiles,
  onProgress,
  onComplete,
  onError,
  concurrentUploads = 3,
}) => {
  try {
    const config = getCloudinaryConfig();
    const validFiles = mediaFiles.filter((media) => media.file !== null);

    if (validFiles.length === 0) {
      throw new Error("No valid files to upload");
    }

    const uploadPromises = validFiles.map(async (media) => {
      const formData = new FormData();
      formData.append("file", media.file);
      formData.append("upload_preset", config.uploadPreset);
      formData.append("cloud_name", config.cloudName);
      formData.append("folder", config.folder);
      formData.append("resource_type", "auto");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${config.cloudName}/auto/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`);
        }

        const data = await response.json();
        return {
          id: media.id,
          result: data.secure_url,
          type: data.resource_type,
        };
      } catch (error) {
        console.error("Upload error:", error);
        throw error;
      }
    });

    const results = await Promise.all(uploadPromises);
    onComplete(results);
    return results;
  } catch (error) {
    console.error("Upload error:", error);
    onError(error);
    throw error;
  }
};

const finalizeUpload = async (uploadId, resourceType) => {
  const config = getCloudinaryConfig();
  const timestamp = Math.round(Date.now() / 1000);

  try {
    const formData = new FormData();
    formData.append("upload_preset", config.uploadPreset);
    formData.append("api_key", config.apiKey);
    formData.append("timestamp", timestamp);
    formData.append("upload_id", uploadId);
    formData.append("final_chunk", "true");

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${config.cloudName}/${resourceType}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        timeout: 60000,
      }
    );

    if (!response.data) {
      throw new Error("No response data from Cloudinary during finalization");
    }

    if (response.data.error) {
      throw new Error(
        `Cloudinary finalization error: ${response.data.error.message}`
      );
    }

    // Return the secure_url from the response
    return response.data.secure_url;
  } catch (error) {
    console.error("Finalization error details:", {
      error: error.message,
      response: error.response?.data,
      config: error.config,
    });
    throw new Error(
      `${UPLOAD_ERRORS.CLOUDINARY}: Finalization failed - ${
        error.response?.data?.error?.message || error.message
      }`
    );
  }
};

const cancelUpload = async (uploadId) => {
  const config = getCloudinaryConfig();
  try {
    await axios.delete(config.uploadUrl, {
      params: { upload_id: uploadId, upload_preset: config.uploadPreset },
    });
  } catch (error) {
    console.error("Cancel upload failed:", error.message);
  }
};

export {
  handleUploadMedia,
  UPLOAD_ERRORS,
  FILE_CONFIG,
  validateFile,
  createChunks,
  cancelUpload,
  finalizeUpload,
};
