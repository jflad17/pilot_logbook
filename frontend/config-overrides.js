const path = require('path');

module.exports = function override(config, env) {
  config.resolve.alias = {
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@services': path.resolve(__dirname, 'src/services'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@customComponents': path.resolve(__dirname, 'src/customComponents'),
  };
  config.devServer = {
    hot: false,
    inline: false,
  };
  return config;
};
