const path = require('path');

module.exports = function override(config, env) {
  config.resolve.alias = {
    '@api': path.resolve(__dirname, 'src/api'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@images': path.resolve(__dirname, 'src/images'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@services': path.resolve(__dirname, 'src/services'),
  };
  config.devServer = {
    hot: false,
    inline: false,
  };
  return config;
};
