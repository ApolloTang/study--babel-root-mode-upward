const pathResolve = require('path').resolve;
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const webpack = require('webpack');

// -- Configuration Setting -- //
const webpackDevServer_host = 'localhost';
const webpackDevServer_port = '3001';
const absPathToSrc = pathResolve(__dirname, 'src');
const absPathToDist = pathResolve(__dirname, 'dist');

const webpackConfig_fn = (env = {}) => {
  const _mode = env.mode || 'production';
  const { ifProduction } = getIfUtils(_mode);

  const devServer = ifProduction(
    {},
    {
      devServer: {
        host: webpackDevServer_host,
        port: webpackDevServer_port,
        historyApiFallback: true,
        stats: 'minimal',
      },
    }
  );

  const configOut = {
    ...devServer,
    mode: _mode,
    devtool: 'source-map',
    context: absPathToSrc,
    entry: {
      main: ['./main'],
    },
    output: ifProduction(
      {
        filename: '[name]-[chunkhash].js',
        path: absPathToDist,
      },
      {
        publicPath: '/',
      }
    ),
    resolve: {
      modules: [absPathToSrc, 'node_modules'],
      extensions: ['*', '.mjs', '.js'],
    },
    module: {
      rules: removeEmpty([
        {
          test: /\.m?js$/,
          use: 'babel-loader',
          exclude: /node_modules/, // <---- very important
        },
      ]),
    },
    plugins: removeEmpty([
    ]),
  };

  return configOut;
};

module.exports = webpackConfig_fn;
