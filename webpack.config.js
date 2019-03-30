var path = require('path');
module.exports = {
  entry: './out/index.js',
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      EGZOController$: path.resolve(__dirname, 'lib/egzo-controller.js'),
    }
  },
  module: {
	  rules: [
		{
		  test: /\.js$/,
		  exclude: /(node_modules)/,
		  use: {
			loader: 'babel-loader',
			options: {
			  presets: ['@babel/preset-env']
			}
		  }
		}
	  ]
	}
};