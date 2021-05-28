const config = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }
    return config;
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
};

module.exports = config;
