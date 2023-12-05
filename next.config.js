// next.config.js
require("dotenv").config();

module.exports = {
  webpack(config) { 
    config.module.rules.push({
      test: /\.geojson$/,
      use: ["json-loader"],
    });
    return config;
  },
  env: {
    staticFolder: '/props',
  },
};
