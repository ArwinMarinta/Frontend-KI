export const urlToFile = async (url: string, fileName: string): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();

  const extension = fileName.split(".").pop()?.toLowerCase();
  let mimeType = "application/octet-stream";

  if (extension === "pdf") mimeType = "application/pdf";
  else if (extension === "doc" || extension === "docx") mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  else if (["png", "jpg", "jpeg"].includes(extension || "")) mimeType = `image/${extension}`;

  return new File([blob], fileName, { type: mimeType });
};

export const processFile = async (url: string | null): Promise<File | null> => {
  if (!url) return null;
  const fileName = url.split("/").pop() || "file";
  return await urlToFile(url, fileName);
};
