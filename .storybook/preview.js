import "../public/styles/index.css";

export const parameters = {
  layout: "fullscreen",
  actions: { argTypesRegex: "^on[A-Z].*" },
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
