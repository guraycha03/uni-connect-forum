// next.config.js


// next.config.js

const repoName = 'uni-connect-forum'; // <-- CONFIRM THIS MATCHES YOUR REPO

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other configs
  //output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? `/${repoName}` : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? `/${repoName}/` : '',
  images: {
    unoptimized: true,
  },
  // ...
};

module.exports = nextConfig;

