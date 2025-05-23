export const toSlug = (text: string | undefined): string => {
  if (!text) return "";
  return text.toLowerCase().replace(/\s+/g, "-");
};

export function formatLabel(text: string | undefined): string {
  if (!text) return "";
  return text
    .split("-") // pisahkan jika ada tanda hubung
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // kapital huruf pertama
    .join(" "); // gabungkan kembali dengan spasi
}
