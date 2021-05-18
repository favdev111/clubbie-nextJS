module.exports = {
  plugins: [],
  module: {
    rules: [
      { loader: "sass-loader" },
      {
        loader: "css-loader",
        options: {
          modules: true,
        },
      },

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
