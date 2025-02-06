import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";
import { handleUploadMedia, FILE_CONFIG } from "../lib/fileUpload";

const UploadStatus = {
  IDLE: "idle",
  UPLOADING: "uploading",
  COMPLETED: "completed",
  ERROR: "error",
};

const UploadMedia = ({
  index,
  previewUrl,
  finalUrl,
  mediaType,
  onFileSelect,
  onUploadComplete,
  onRemove,
  isDeleting,
}) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(UploadStatus.IDLE);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadId] = useState(() => crypto.randomUUID());

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = useCallback(
    async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {

        // Create object URL for preview
        const previewUrl = URL.createObjectURL(file);
        onFileSelect({ target: { files: [file] } }, index);

        setUploadStatus(UploadStatus.UPLOADING);
        setErrorMessage("");
        setUploadProgress(0);


        console.log("Starting upload for file:", {
          name: file.name,
          type: file.type,
          size: file.size,
          uploadId,
        });

        await handleUploadMedia({
          mediaFiles: [{ file, id: uploadId }],

          onProgress: (progress) => {
            setUploadProgress(progress);

          },
          onComplete: (results) => {
            const result = results.find((r) => r.id === uploadId);
            if (result?.result) {
              console.log("Upload completed successfully:", {
                uploadId,
                url: result.result,
                type: result.type,
              });
              setUploadStatus(UploadStatus.COMPLETED);
              setUploadProgress(100);
              onUploadComplete(result.result, index);
            } else {

              throw new Error("Upload completed but no URL returned");

            }
          },
          onError: (error) => {
            console.error("Upload failed:", {
              error,
              fileName: file.name,
              uploadId,

            });
            setUploadStatus(UploadStatus.ERROR);
            setErrorMessage(error.message || "Upload failed");

            setUploadProgress(0);
            onUploadComplete("", index);
          },
        });
      } catch (error) {
        console.error("File upload error:", {
          error,


          fileName: file?.name,
          uploadId,
        });
        setUploadStatus(UploadStatus.ERROR);

        setErrorMessage(error.message || "Upload failed");

        setUploadProgress(0);
      }
    },
    [onFileSelect, onUploadComplete, index, uploadId]
  );

  const renderPreview = () => {
    const url = finalUrl || previewUrl;

    console.log("Rendering preview:", { url, mediaType, finalUrl, previewUrl });

    if (!url) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <img
            src="/images/image-upload.svg"
            alt="Upload placeholder"
            className="w-1/2"
          />
        </div>
      );
    }

    try {
      if (mediaType === "video") {
        return (
          <video
            key={url}
            src={url}
            className="w-full h-full object-cover"
            controls
            controlsList="nodownload nofullscreen noremoteplayback"
            onError={(e) => {
              console.error("Video failed to load:", { url, error: e });
              e.target.poster = "/images/image-upload.svg";
            }}
          />
        );
      }

      return (
        <div className="w-full h-full relative">
          <img
            key={url}
            src={url}
            alt="Upload preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error("Image failed to load:", { url, error: e });
              // Try using the data URL as fallback if available
              const dataUrl = e.target.dataset.dataUrl;
              if (dataUrl) {
                console.log("Attempting to use data URL fallback");
                e.target.src = dataUrl;
              } else {
                e.target.src = "/images/image-upload.svg";
              }
            }}
            data-data-url={
              previewUrl?.startsWith("data:") ? previewUrl : undefined
            }
            //onLoad={() => console.log("Image loaded successfully:", url)}
          />
        </div>
      );
    } catch (error) {
      console.error("Error rendering preview:", error);
      return (
        <div className="w-full h-full flex items-center justify-center">
          <img
            src="/images/image-upload.svg"
            alt="Upload placeholder"
            className="w-1/2"
          />
        </div>
      );
    }
  };

  return (
    <div className="relative w-36 aspect-square md:min-w-48">
      <input
        className="hidden"
        type="file"
        id={`media-${uploadId}`}
        accept={[...FILE_CONFIG.image.types, ...FILE_CONFIG.video.types].join(
          ","
        )}
        onChange={handleFileChange}
        disabled={uploadStatus === UploadStatus.UPLOADING}
      />

      <label
        htmlFor={`media-${uploadId}`}
        className="block w-full h-full cursor-pointer"
      >
        <div className="w-full aspect-square bg-[#F2F4F8] grid place-items-center rounded-2xl overflow-hidden relative">
          {renderPreview()}

          {uploadStatus === UploadStatus.UPLOADING && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4">
              <div className="w-full max-w-[90%] bg-white rounded-lg p-3">
                <div className="mb-2 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Uploading...
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {uploadProgress}%
                  </span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            </div>
          )}

          {uploadStatus === UploadStatus.ERROR && (
            <div className="absolute inset-0 bg-red-500 bg-opacity-75 flex flex-col items-center justify-center p-4 text-white">
              <div className="text-center">
                <div className="font-medium mb-2">Upload Failed</div>
                <div className="text-sm opacity-90">{errorMessage}</div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setUploadStatus(UploadStatus.IDLE);
                    setErrorMessage("");
                  }}
                  className="mt-3 px-4 py-2 bg-white text-red-500 rounded-md text-sm font-medium hover:bg-red-50"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {(previewUrl || finalUrl) && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRemove(index);
              }}
              disabled={isDeleting || uploadStatus === UploadStatus.UPLOADING}
              className="absolute top-2 right-2 z-10 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 disabled:opacity-50"
            >
              {isDeleting ? (
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <X className="h-4 w-4" />
              )}
            </Button>
          )}

          {!previewUrl &&
            !finalUrl &&
            uploadStatus !== UploadStatus.UPLOADING && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
                <div className="text-center">
                  <div className="text-gray-500 text-sm">Click to upload</div>
                  <div className="text-gray-400 text-xs">
                    JPG, PNG, GIF, MP4
                  </div>
                </div>
              </div>
            )}
        </div>
      </label>
    </div>
  );
};

UploadMedia.propTypes = {
  index: PropTypes.number.isRequired,
  previewUrl: PropTypes.string,
  finalUrl: PropTypes.string,
  mediaType: PropTypes.oneOf(["image", "video"]),
  onFileSelect: PropTypes.func.isRequired,
  onUploadComplete: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool,
};

UploadMedia.defaultProps = {
  previewUrl: "",
  finalUrl: "",
  mediaType: "image",
  isDeleting: false,
};

export default UploadMedia;
