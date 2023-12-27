const { resolve } = require('path');
const merge = require('webpack-merge');
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const Dotenv = require('dotenv-webpack');
const _modeflag = _mode === 'production' ? true : false;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackBaseConfig = {
  entry: {
    main: resolve('src/index.tsx'),
  },
  output: {
    path: resolve(process.cwd(), 'dist'),
  },
  resolve: {
    alias: {
      '@pages': resolve('src/pages'),
      '@abis': resolve('src/abis'),
      '@states': resolve('src/states'),
      '@hooks': resolve('src/hooks'),
      '@components': resolve('src/components'),
      '@utils': resolve('src/utils'),
    },
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        // exclude: /(node_modules)/,
        use: {
          loader: 'swc-loader',
        },
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        include: [resolve(__dirname, 'src')],
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
    ],
  },
  //   cache: {
  //    type: 'filesystem',
  //    cacheDirectory: resolve(__dirname, '.temp'),
  //   },
  plugins: [
    new MiniCssExtractPlugin({
      filename: _modeflag ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
      chunkFilename: _modeflag ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
      ignoreOrder: false,
    }),
    new Dotenv(),
  ],
};

module.exports = merge.default(webpackBaseConfig, _mergeConfig);
