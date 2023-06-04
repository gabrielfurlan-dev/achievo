// const withImages = require("next-images");
// module.exports = withImages({
//     esModule: true,
// });

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  async rewrites() {
    return [
      {
        source: "/meu-hub",
        destination: "http://localhost:5184/meu-hub",
      },
    ];
  },

  async serverMiddleware() {
    const proxy = createProxyMiddleware("/meu-hub", {
      target: "http://localhost:5184",
      ws: true,
      changeOrigin: true,
      logLevel: "debug",
    });

    return [proxy];
  },
};
