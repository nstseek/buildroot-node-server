const path = require('path');

module.exports = {
  target: 'node',  // Indicate the target is node
  entry: './tsc_output/index.js',  // Entry file
  output: {
    path: path.resolve(__dirname, 'build'),  // Output directory
    filename: 'index.js',  // Output filename
  },
  resolve: {
    extensions: ['.js'],  // File extensions to resolve
  },
  module: {
    rules: [
      {
        test: /\.js$/,  // Use babel-loader for js files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
