import apiClient from "@/lib/apiClient";

export interface UploadResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    url: string;
    publicId: string;
    format: string;
    bytes: number;
  };
}

export async function uploadImage(
  file: File,
  folder?: string,
): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("image", file);
  if (folder) {
    formData.append("folder", folder);
  }

  return apiClient("/upload/image", {
    method: "POST",
    body: formData,
  });
}
