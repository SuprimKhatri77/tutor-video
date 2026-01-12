"use client";
import { useUploadThing } from "@/utils/uploadthing";
import Image from "next/image";
import { useRef, useState } from "react";

type Props = {
  onUploadComplete: (url: string[]) => void;
  children?: React.ReactNode;
  className?: string;
  uploadingContent?: React.ReactNode;
  showPreview?: boolean;
  previewClassName?: string;
  defaultImage?: string[];
};

export function ImageUploadButton({
  onUploadComplete,
  children,
  className = "",
  uploadingContent,
  showPreview = true,
  previewClassName = "",
  defaultImage,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isUploading, startUpload } = useUploadThing("imageUploader");
  const [uploadedUrls, setUploadedUrls] = useState<string[]>(
    defaultImage || []
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const filesArray = Array.from(files);
    const uploaded = await startUpload(filesArray);
    console.log("uploaded: ", uploaded);

    if (uploaded) {
      const urls = uploaded.map((f) => f.ufsUrl);

      console.log("urls: ", urls);

      setUploadedUrls(urls);
      onUploadComplete(urls);
    }
  };

  const handleClick = () => {
    if (!isUploading) {
      inputRef.current?.click();
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        multiple={true}
      />

      <button
        onClick={handleClick}
        disabled={isUploading}
        className={`transition-all ${
          isUploading
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer hover:opacity-80"
        } ${className}`}
        type="button"
      >
        {isUploading
          ? uploadingContent || (
              <div className="flex items-center gap-2 z-100 fixed ">
                <svg
                  className="animate-spin h-5 w-5 absolute top-10 left-10"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Uploading...</span>
              </div>
            )
          : children || "Upload Image"}
      </button>

      {showPreview && uploadedUrls.length > 0 && (
        <div className={`grid grid-cols-3 gap-2 ${previewClassName}`}>
          {uploadedUrls.map((url) => (
            <div
              key={url}
              className="relative w-full aspect-square rounded-lg overflow-hidden"
            >
              <Image fill src={url} alt="preview" className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
