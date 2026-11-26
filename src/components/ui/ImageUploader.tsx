"use client";

import React, { useRef, useState, useEffect } from "react";
import { Upload, X, Loader2, CheckCircle2, Image as ImageIcon, RefreshCw, Link as LinkIcon } from "lucide-react";
import { uploadToImgbb, validateImageFile } from "@/lib/utils/imgbb";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  onUploadingChange?: (isUploading: boolean) => void;
  label?: string;
  required?: boolean;
  description?: string;
  aspectRatio?: "square" | "video" | "banner" | "auto";
  className?: string;
}

export function ImageUploader({
  value = "",
  onChange,
  onUploadingChange,
  label = "ছবি আপলোড করুন",
  required = false,
  description = "JPG, PNG, WEBP বা GIF (সর্বোচ্চ ১০ মেগাবাইট)",
  aspectRatio = "auto",
  className = "",
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [manualMode, setManualMode] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    onUploadingChange?.(isUploading);
  }, [isUploading, onUploadingChange]);

  // Cleanup object URL
  useEffect(() => {
    return () => {
      if (localPreview && localPreview.startsWith("blob:")) {
        URL.revokeObjectURL(localPreview);
      }
    };
  }, [localPreview]);

  const handleFileSelect = async (file: File) => {
    // Validate file
    const validation = validateImageFile(file, 10);
    if (!validation.valid) {
      toast.error(validation.error || "অকার্যকর ছবি ফাইল");
      return;
    }

    // Immediate local preview
    if (localPreview && localPreview.startsWith("blob:")) {
      URL.revokeObjectURL(localPreview);
    }
    const blobUrl = URL.createObjectURL(file);
    setLocalPreview(blobUrl);

    setIsUploading(true);
    try {
      toast.info("ImgBB ক্লাউডে ছবি আপলোড হচ্ছে...", { duration: 2500 });
      const res = await uploadToImgbb(file);
      if (res?.url) {
        onChange(res.url);
        toast.success("ছবি সফলভাবে আপলোড হয়েছে এবং লিঙ্ক যুক্ত হয়েছে!");
      }
    } catch (err: any) {
      setLocalPreview(null);
      toast.error(err?.message || "ছবি আপলোড ব্যর্থ হয়েছে। পুনরায় চেষ্টা করুন।");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (localPreview && localPreview.startsWith("blob:")) {
      URL.revokeObjectURL(localPreview);
    }
    setLocalPreview(null);
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const currentDisplayUrl = localPreview || value;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-stone-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <button
            type="button"
            onClick={() => setManualMode(!manualMode)}
            className="text-[11px] text-[#D62828] hover:underline flex items-center gap-1 cursor-pointer font-medium"
          >
            <LinkIcon className="size-3" />
            <span>{manualMode ? "ফাইল আপলোড মোড" : "সরাসরি লিঙ্ক পেস্ট"}</span>
          </button>
        </div>
      )}

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
      />

      {manualMode ? (
        /* Manual URL mode */
        <div className="space-y-2">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://i.ibb.co/... অথবা ছবির সরাসরি URL পেস্ট করুন"
            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 font-mono focus:outline-none focus:ring-2 focus:ring-[#D62828]/30 focus:border-[#D62828]"
          />
          {value && (
            <div className="relative w-28 h-20 rounded-lg overflow-hidden border border-stone-200 bg-stone-100">
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      ) : currentDisplayUrl ? (
        /* Image Preview with Replace / Remove controls */
        <div className="relative rounded-xl border border-red-300 bg-red-50/40 p-3 flex flex-col sm:flex-row items-center gap-3">
          <div
            className={`relative rounded-lg overflow-hidden border border-red-400 bg-white shadow-xs shrink-0 ${
              aspectRatio === "square"
                ? "w-20 h-20"
                : aspectRatio === "video"
                ? "w-32 h-20"
                : aspectRatio === "banner"
                ? "w-40 h-16"
                : "w-24 h-24"
            }`}
          >
            <img
              src={currentDisplayUrl}
              alt="Uploaded file preview"
              className="w-full h-full object-cover"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center text-white">
                <Loader2 className="size-5 animate-spin" />
              </div>
            )}
          </div>

          <div className="flex-1 space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-red-800">
              <CheckCircle2 className="size-3.5 text-red-600" />
              <span>{isUploading ? "আপলোড হচ্ছে..." : "ImgBB ক্লাউডে হোস্ট করা হয়েছে"}</span>
            </div>
            {value && (
              <p className="text-[11px] text-stone-500 font-mono truncate max-w-xs sm:max-w-md">
                {value}
              </p>
            )}

            <div className="pt-1 flex items-center justify-center sm:justify-start gap-2">
              <Button
                type="button"
                size="xs"
                variant="outline"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="text-xs h-7 border-stone-300 bg-white"
              >
                <RefreshCw className="size-3 mr-1" />
                ছবি পরিবর্তন
              </Button>
              <Button
                type="button"
                size="xs"
                variant="outline"
                disabled={isUploading}
                onClick={handleRemove}
                className="text-xs h-7 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 bg-white"
              >
                <X className="size-3 mr-1" />
                মুছে ফেলুন
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty Upload Dropzone */
        <div
          onClick={() => {
            if (!isUploading) fileInputRef.current?.click();
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (isUploading) return;
            const file = e.dataTransfer.files?.[0];
            if (file) handleFileSelect(file);
          }}
          className={`cursor-pointer border-2 border-dashed rounded-xl p-5 text-center transition-all ${
            isUploading
              ? "border-[#D62828] bg-red-50/50"
              : "border-stone-300 hover:border-[#D62828] bg-stone-50/60 hover:bg-red-50/30"
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center justify-center py-2">
              <Loader2 className="size-6 text-[#D62828] animate-spin mb-1.5" />
              <p className="text-xs font-bold text-stone-800">ImgBB ক্লাউডে আপলোড হচ্ছে...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="size-9 rounded-full bg-stone-200/80 text-stone-600 flex items-center justify-center mb-1.5">
                <Upload className="size-4 text-[#D62828]" />
              </div>
              <p className="text-xs font-bold text-stone-800">
                ছবি নির্বাচন করতে ক্লিক করুন বা এখানে টেনে আনুন
              </p>
              <p className="text-[11px] text-stone-500 mt-0.5">{description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
