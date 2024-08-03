const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

module.exports = (env) => {
  const isProduction = env.NODE_ENV === 'production';
  const envFile = isProduction ? '.env' : '.env';
  const envPath = path.resolve(__dirname, envFile);
  const envVars = require('dotenv').config({ path: envPath }).parsed || {};

  return {
    entry: path.join(__dirname, "src", "index.js"),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    
  
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(envVars),
      }),
      new HtmlWebpackPlugin({
        //template: path.join(__dirname, "src", "index.html"), // to import index.html file inside index.js
        template: path.join(__dirname, "public", "index.html"),
        favicon: path.join(__dirname, "public", "favicon.ico"),
        manifest: path.join(__dirname, "public", "manifest.json"),
        filename: 'index.html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
        // chunksSortMode: "auto",
      }),
      new webpack.HotModuleReplacementPlugin(),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
      new RemoveEmptyScriptsPlugin(),
  
    ],
    optimization: {
      minimize: true,
      minimizer: [new CssMinimizerPlugin()],
      minimizer: [new TerserPlugin()],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      compress: true,
      open: true,
      port: 3000,
      host:'0.0.0.0',
      historyApiFallback: true,
     
  
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/, // .js and .jsx files
          exclude: /node_modules/, // excluding the node_modules folder
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.(sa|sc|c)ss$/, // styles files
          use: [MiniCssExtractPlugin.loader, 'css-loader', "sass-loader"],
        },
        
        {
          test: /\.(png|jpg|gif|svg)$/,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    mode: "production",
     
}
};


// https://dev.to/knitesh/using-specific-env-file-in-react-webpack-4pkj
