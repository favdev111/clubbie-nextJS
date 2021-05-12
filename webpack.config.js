module.exports = {
  plugins: [],
  module: {
    rules: [
      // BABEL
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /(node_modules)/,
        options: {
          compact: true,
        },
      },
    ],
  },
};
