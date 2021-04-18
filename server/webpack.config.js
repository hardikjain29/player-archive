const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeEnv = process.env.NODE_ENV;


module.exports = {
  entry: path.resolve('.', 'index.ts'),
  target: "node",
  mode: nodeEnv,
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: [
            {
                loader: 'babel-loader',
            },
            {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true,
              }
            },
        ],
      },
    ],
  },
  plugins: [
    new NodemonPlugin({
      ext: 'js',
      script: path.resolve('.', 'dist', 'server.js'),
      watch: path.resolve('.', 'dist'),
    })
  ],
  resolve: {
    mainFields: ['main', 'module'],
    extensions: ['.ts', '.tsx', '.js', '.json', '.d.ts'],
  },
};