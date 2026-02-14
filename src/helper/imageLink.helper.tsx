export const getImageSrc = (path?: string) => {
  if (!path) return "/images/test/404.jpg";
  if (path.startsWith("http")) return path;
  return path.startsWith("/") ? path : "/" + path;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getServerImageSrc = (path?: string): string => {
  if (!path) return "/images/test/404.jpg";
  if (path.startsWith("http")) return path;

  // if starts with "/" or "images/" — prefix backend base URL
  return `${apiUrl}/${path.replace(/^\/+/, "")}`;
};