import axios from "axios";

/**
 * ImgBB API Configuration & Direct Upload Utility
 *
 * Centralized utility to upload images directly to ImgBB using Axios.
 * Returns only the required URL-related fields for saving into database.
 */

export const IMGBB_API_KEY: string =
  process.env.NEXT_PUBLIC_IMGBB_API_KEY || "277db99c04187cbeac1df60f80005309";

export const IMGBB_FALLBACK_KEYS = [
  "277db99c04187cbeac1df60f80005309",
  "5b8b98f2aa7491cf12e0e090db70461d",
  "464be16a5b67ec7466eb30e7914f6b21",
];

export const IMGBB_UPLOAD_URL = "https://api.imgbb.com/1/upload";

/**
 * Result contains only the required URL-related fields.
 * Does not contain image size or MIME type.
 */
export interface ImgbbUploadResult {
  url: string;
  displayUrl: string;
  deleteUrl?: string;
  thumbnailUrl?: string;
}

/**
 * Validate image file before uploading (MIME type and size limit)
 */
export function validateImageFile(
  file: File,
  maxSizeMB = 10
): { valid: boolean; error?: string } {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
  ];

  if (!allowedMimeTypes.includes(file.type)) {
    return {
      valid: false,
      error: "শুধুমাত্র JPG, PNG, WEBP অথবা GIF ফরম্যাটের ছবি গ্রহণযোগ্য।",
    };
  }

  const maxBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxBytes) {
    return {
      valid: false,
      error: `ছবির সাইজ সর্বোচ্চ ${maxSizeMB}MB হতে পারে। বর্তমান সাইজ: ${(file.size / (1024 * 1024)).toFixed(1)}MB`,
    };
  }

  return { valid: true };
}

/**
 * Upload an image (File, Blob, or base64 data string) directly to ImgBB via Axios.
 *
 * @param image - File, Blob, or base64 string
 * @param options - optional custom name and expiration (in seconds)
 * @returns Promise<ImgbbUploadResult> containing only URL-related fields
 */
export async function uploadToImgbb(
  image: File | Blob | string,
  options?: { name?: string; expiration?: number }
): Promise<ImgbbUploadResult> {
  const keysToTry = [IMGBB_API_KEY, ...IMGBB_FALLBACK_KEYS.filter((k) => k !== IMGBB_API_KEY)];

  let lastError: any = null;

  for (const apiKey of keysToTry) {
    if (!apiKey) continue;

    const formData = new FormData();
    if (typeof image === "string") {
      const cleanBase64 = image.includes(",") ? image.split(",")[1] : image;
      formData.append("image", cleanBase64);
    } else {
      formData.append("image", image);
    }

    if (options?.name) {
      formData.append("name", options.name);
    }
    if (options?.expiration) {
      formData.append("expiration", String(options.expiration));
    }

    try {
      // Do NOT explicitly set 'Content-Type': 'multipart/form-data' so the browser attaches the multipart boundary!
      const response = await axios.post(IMGBB_UPLOAD_URL, formData, {
        params: { key: apiKey },
        timeout: 30000,
      });

      const data = response.data?.data;
      if (data && data.url) {
        return {
          url: data.url,
          displayUrl: data.display_url || data.url,
          deleteUrl: data.delete_url,
          thumbnailUrl: data.thumb?.url,
        };
      }
    } catch (error: any) {
      lastError = error;
      // Continue to next key if available
    }
  }

  const message =
    lastError?.response?.data?.error?.message ||
    lastError?.response?.data?.message ||
    lastError?.message ||
    "ছবি আপলোড ব্যর্থ হয়েছে। আপনি বিকল্প হিসেবে ছবির সরাসরি লিঙ্ক পেস্ট করতে পারেন।";
  throw new Error(message);
}

/**
 * Helper to upload image and return only the direct URL string.
 */
export async function uploadImage(
  file: File | Blob | string,
  options?: { name?: string }
): Promise<string> {
  const result = await uploadToImgbb(file, options);
  return result.url;
}

export default uploadToImgbb;
