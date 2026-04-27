export const getImageSrc = (img) => {
  if (!img) return "/placeholder.jpg";
  if (img.startsWith("http")) return img;
  return img.startsWith("/") ? img : `/${img}`;
};