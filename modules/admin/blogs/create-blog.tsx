"use client";
import { useState } from "react";
import Image from "next/image";
import { ImageUploadButton } from "@/components/image-upload-btn";
import { createBlog } from "@/actions/blogs/create-blog";
import { toast } from "sonner";
import { CreateBlogResponse } from "@/utils/validators/blog.validator";
import { FieldError } from "@/components/ui/field";

type BlogFormData = {
  title: string;
  description: string;
  images: string[];
};

export default function CreateBlogPage() {
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    description: "",
    images: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<CreateBlogResponse["errors"]>({});

  const handleImageUpload = (urls: string[]) => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...urls],
    }));
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description) {
      toast.warning("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createBlog(formData);
      if (!result.success) {
        toast.message(result.message);
        if (result.errors) {
          setErrors(result.errors);
        }
        setIsSubmitting(false);
        return;
      }
      setFormData({ title: "", description: "", images: [] });
      toast.success(result.message);
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setFormData({ title: "", description: "", images: [] });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-black mb-2">
            Create New Blog
          </h1>
          <p className="text-gray-600">TutorDai</p>
        </div>

        {/* Form */}
        <div className="space-y-8">
          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-black mb-2"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black transition-all"
              placeholder="Enter your blog title"
            />
            {errors?.properties?.title && (
              <FieldError>{errors.properties.title[0]}</FieldError>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-black mb-2"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={8}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black transition-all resize-none"
              placeholder="Write your blog content here..."
            />
            {errors?.properties?.description && (
              <FieldError>{errors.properties.description[0]}</FieldError>
            )}
          </div>

          {/* Images Section */}
          <div>
            <label className="block text-sm font-semibold text-black mb-4">
              Images
            </label>

            {/* Image Preview Grid */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {formData.images.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="relative aspect-square border-2 border-black overflow-hidden group"
                  >
                    <Image
                      src={imageUrl}
                      alt={`Blog image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-black text-white w-8 h-8 flex items-center justify-center hover:bg-gray-800 transition-colors opacity-0 group-hover:opacity-100"
                      aria-label="Remove image"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                {errors?.properties?.description && (
                  <FieldError>{errors.properties.description[0]}</FieldError>
                )}
              </div>
            )}

            {/* Upload Button */}
            <ImageUploadButton
              onUploadComplete={handleImageUpload}
              className="w-full px-6 py-4 border-2 border-black bg-white text-black font-semibold hover:bg-black hover:text-white transition-all"
              uploadingContent={
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
              }
              showPreview={false}
            >
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Image
              </span>
            </ImageUploadButton>

            <p className="text-sm text-gray-500 mt-2">
              {formData.images.length} image(s) uploaded
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-6 border-t-2 border-black">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 px-8 py-4 bg-black text-white font-semibold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating..." : "Create Blog"}
            </button>
            <button
              onClick={handleClear}
              className="px-8 py-4 border-2 border-black text-black font-semibold hover:bg-gray-100 transition-all"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
