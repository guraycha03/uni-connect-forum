// next.config.js
module.exports = {
  trailingSlash: true, // Update the outdated 'exportTrailingSlash' to 'trailingSlash'
  
  reactStrictMode: true,  // Ensures React strict mode is enabled

  images: {
    unoptimized: true,  // Allow image optimization to work with static exports
  },
}
