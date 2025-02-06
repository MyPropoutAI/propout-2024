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
  apiKey: "468958649223754",
  uploadPreset: "propout",
  uploadUrl: `https://api.cloudinary.com/v1_1/dttqyhyv5/auto/upload`,
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
    const uploadQueue = mediaFiles.map((fileObj) => {
      try {
        // Ensure proper file object structure
        const file = fileObj.file;
        if (!file) {
          throw new Error(
            `${UPLOAD_ERRORS.FILE_TYPE}: No file provided in media object`
          );
        }

        // Create a properly structured object for validation
        const validationObj = { file };
        const typeCategory = validateFile(validationObj);

        // Create chunks after validation
        const { chunks, totalChunks, uploadId } = createChunks(validationObj);

        return {
          chunks,
          totalChunks,
          uploadId,
          id: fileObj.id,
          file,
          progress: 0,
          completedChunks: new Set(),
          typeCategory,
        };
      } catch (error) {
        console.error("File validation error:", {
          file: fileObj?.file?.name,
          error: error.message,
        });
        throw new Error(
          `File validation failed for "${fileObj?.file?.name}": ${error.message}`
        );
      }
    });

    const updateProgress = (uploadId, chunkIndex, totalChunks, progress) => {
      const upload = uploadQueue.find((u) => u.id === uploadId);
      if (!upload) return;

      upload.completedChunks.add(chunkIndex);
      upload.progress = progress;

      const totalProgress = uploadQueue.reduce((sum, u) => sum + u.progress, 0);

      console.log("Progress update:", {
        uploadId,
        progress,
        chunkIndex,
        totalChunks,
        completedChunks: upload.completedChunks.size,
        totalUploadProgress: Math.round(totalProgress / uploadQueue.length),
      });

      onProgress?.(
        uploadQueue.map((u) => ({
          id: u.id,
          fileName: u.file.name,
          progress: Math.round(u.progress),
          type: u.typeCategory,
        }))
      );
    };

    const processUpload = async (upload) => {
      try {
        console.log("Starting upload process for:", {
          fileName: upload.file.name,
          id: upload.id,
          chunks: upload.chunks.length,
        });

        // Upload all chunks
        const chunkResults = await Promise.all(
          upload.chunks.map((chunk) =>
            retryOperation(
              () =>
                uploadChunk(
                  chunk,
                  upload.file.name,
                  upload.uploadId,
                  chunk.index,
                  upload.chunks.length,
                  upload.typeCategory,
                  (chunkIndex, totalChunks, progress) => {
                    console.log("Chunk upload progress:", {
                      chunkIndex,
                      totalChunks,
                      progress,
                    });
                    updateProgress(
                      upload.id,
                      chunkIndex,
                      totalChunks,
                      progress
                    );
                  }
                ),
              3,
              1000
            )
          )
        );

        // Finalize the upload
        const finalUrl = await finalizeUpload(
          upload.uploadId,
          upload.typeCategory
        );

        return {
          id: upload.id,
          fileName: upload.file.name,
          type: upload.typeCategory,
          result: finalUrl,
          chunkResults,
        };
      } catch (error) {
        console.error("Upload process error:", {
          fileName: upload.file.name,
          error: error.message,
          details: error.details,
        });
        await cancelUpload(upload.uploadId);
        throw error;
      }
    };

    const results = [];
    for (let i = 0; i < uploadQueue.length; i += concurrentUploads) {
      const chunk = uploadQueue.slice(i, i + concurrentUploads);
      const chunkResults = await Promise.all(chunk.map(processUpload));
      results.push(...chunkResults);
    }

    onComplete?.(
      results.map((r) => ({
        id: r.id,
        fileName: r.fileName,
        type: r.type,
        result: r.result,
      }))
    );

    return results;
  } catch (error) {
    console.error("Upload media error:", error);
    onError?.(error);
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
