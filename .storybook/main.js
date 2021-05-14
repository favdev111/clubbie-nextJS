const path = require("path");

module.exports = {
  stories: ["../stories/**/*.stories.js", "../stories/**/*.stories.tsx"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  presets: [path.resolve(__dirname, "./next-preset.js")],
};
