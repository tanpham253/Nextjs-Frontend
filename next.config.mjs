/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    globalNotFound: true,
  },
  images: {
    /**
     * Cấu hình domain cho các tài nguyên tĩnh
     * từ nguồn bên ngoài
     */
    domains: [
      "ecshopvietnam.com",
      "img.freepik.com",
      "i.imgur.com",
      "placeimg.com",
      "down-vn.img.susercontent.com",
    ],
  },
};

export default nextConfig;
