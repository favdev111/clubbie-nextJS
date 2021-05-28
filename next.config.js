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
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  },
};

module.exports = config;
