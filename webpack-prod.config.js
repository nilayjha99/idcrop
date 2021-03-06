const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const extractSass = new ExtractTextPlugin({
  filename: "./dist/css/main.min.css"
});
const uglifyJS = new UglifyJsPlugin({
  sourceMap: true
})

module.exports = {
  entry: {
    IdCrop: './lib/js/idcrop/IdCrop.js'
  },
  output: {
    filename: "./dist/js/bundle.min.js",
    libraryTarget: 'var',
    // `library` determines the name of the global variable
    library: '[name]'
  },
  devtool: "source-map",
  stats: {
    colors: true,
    reasons: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
          use: extractSass.extract({
            use: [{
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            }, {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                outputStyle: "compressed"
              }
            }]
          })
      }
    ]
  },
  plugins: [
    extractSass,
    uglifyJS
  ]
};
