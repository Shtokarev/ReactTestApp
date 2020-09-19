// TO-DO include different module in bundle depending on env variable
// const webpack = require('webpack');
const { override } = require('customize-cra');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const addNormalModuleReplacementPlugin = config => {
  // config.plugins.push(
  //     new webpack.NormalModuleReplacementPlugin(/(.*)-BRANDNAME(\.*)/, function(resource) {
  //         resource.request = resource.request.replace(/-BRANDNAME/, `-${currentRegion}`);
  //     }),
  // );

  if (process.env.ANALYZE === 'true') {
    console.log('Analyzing bundle...')
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};

module.exports = override(addNormalModuleReplacementPlugin);
