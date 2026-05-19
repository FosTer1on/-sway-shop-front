export const MEDIA_URL = import.meta.env.VITE_MEDIA_URL;

export const buildMediaUrl = (path) => {
  if (!path) return "";

  // если уже полный URL
  if (path.startsWith("http")) {
    return path;
  }

  return `${MEDIA_URL}${path}`;
};