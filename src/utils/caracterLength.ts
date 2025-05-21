export const truncateText = (text: string | undefined) => {
  if (!text) return ""; // atau bisa return undefined sesuai kebutuhan
  if (text.length <= 10) return text;
  return text.slice(0, 10) + "...";
};
export const truncateText2 = (text: string | undefined) => {
  if (!text) return ""; // atau bisa return undefined sesuai kebutuhan
  if (text.length <= 10) return text;
  return text.slice(0, 12) + "...";
};
