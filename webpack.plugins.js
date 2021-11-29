const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.join(__dirname, 'assets'),
        to: path.join(__dirname, '.webpack', 'assets'),
      },
    ],
  }),
];
