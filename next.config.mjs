// next.config.mjs

export default {
  reactStrictMode: true,  // Ensures React strict mode is enabled
  trailingSlash: true,  // Optional: Ensures trailing slashes on URLs
  images: {
    unoptimized: true,  // Allow image optimization to work with static exports
  },
};
