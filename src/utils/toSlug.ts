export const toSlug = (text: string | undefined): string => {
  return text.toLowerCase().replace(/\s+/g, "-");
};
