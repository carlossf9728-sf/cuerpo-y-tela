import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fotos de la galería alojadas en Unsplash.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
