var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  devtool: "inline-source-map",
  mode: "none",
  output: {
    path: path.join(__dirname, './test'),
    filename: 'bundle.test.js'
  },
  module: {
    rules: [
      { test: /\.scss$/, loader: 'null-loader' },
      { test: /\.css$/, loader: 'null-loader' },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      },
      {
        test: /\.vue\.html$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      }
    ]
  },
  optimization: {
    minimize: false
	},
  plugins:[
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: {
      '@components': path.resolve('./components'),
      '@': path.resolve('.'),
      '~': path.resolve('.')
    },
    extensions: ['.vue']
  },
  externals: [require('webpack-node-externals')()],
  devtool: 'inline-cheap-module-source-map'
}
