import { API_FILE } from "../config/config";

export function getHrefByFileName(fileName: string): string {
  const extension = fileName.toLowerCase().split(".").pop();

  const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(extension ?? "");
  const folder = isImage ? "image" : "documents";

  return `${API_FILE}/${folder}/${fileName}`;
}
