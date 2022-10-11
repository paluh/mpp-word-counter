// module.exports = {
//   entry: './src/index.js',
//   module: {
//     loaders: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: 'babel',
//         query: {
//           presets: ['es2015']
//         }
//       }
//     ]
//   },
//   output: {
//     path: __dirname + '/dist',
//     filename: 'bundle.js',
//   },
// }

const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'static'),
    publicPath: '/static',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'static'),
    }
  }
};
