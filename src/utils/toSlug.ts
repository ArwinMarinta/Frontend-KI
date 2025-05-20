export const toSlug = (text: string | undefined): string => {
  if (!text) return "";
  return text.toLowerCase().replace(/\s+/g, "-");
};
