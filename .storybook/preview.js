import "../styles/app.css";

export const parameters = {
  layout: "fullscreen",
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    values: [
      { name: "white", value: "#fff" },
      { name: "black", value: "#000" },
      { name: "blue", value: "#5fc4eeb3" },
    ],
  },
  viewport: {
    viewports: {
      mobile: {
        name: "iPhone X",
        styles: {
          width: "375px",
          height: "812px",
        },
      },
      tablet: {
        name: "iPad",
        styles: {
          width: "768px",
          height: "1024px",
        },
      },
      laptop: {
        name: "Laptop",
        styles: {
          width: "1280px",
          height: "720px",
        },
      },
      desktop: {
        name: "Desktop",
        styles: {
          width: "1440px",
          height: "900px",
        },
      },
    },
  },
};
