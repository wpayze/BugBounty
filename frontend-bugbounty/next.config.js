module.exports = {
  env: {
    API_URL: process.env.API_URL,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.generator.asset.publicPath = "/_next/";
    }
    return config;
  },
  images: {
    domains: ['localhost'],
}
};
