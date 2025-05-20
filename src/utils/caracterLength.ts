export const truncateText = (text: string) => {
  if (text.length <= 10) return text;
  return text.slice(0, 10) + "...";
};
