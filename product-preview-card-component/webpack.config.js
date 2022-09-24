const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // It has to go in this order
          MiniCssExtractPlugin.loader,
          // Creates `style` nodes from JS strings
          // Not needed if MiniCssExtractPlugin is being used
          // "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          //
          "postcss-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif|webp)$/,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "./fonts/[name][contenthash][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "images"),
          to: "images",
        },
        /* {
          from: path.resolve(__dirname, "src", "fonts"),
          to: "fonts",
        }, */
      ],
    }),
  ],
  // Better use for development only
  // devtool: "source-map",
};

/*
const path = require("path");

// PLUGINS
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development", // "production" | "none"
  entry: {
    main: "./src/index.js", // where Webpack starts bundling
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          //MiniCssExtractPlugin.loader,
          "css-loader",
          "style-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
        type: "asset/resource",
        options: {
          esModule: false,
          name: "src/images/[name].[ext]",
        },
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "application/font-woff",
            name: "[name].[contentHash].[ext]",
            outputPath: "./assets/fonts/",
            publicPath: "../assets/fonts/",
            esModule: false,
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      //title: "Frontend Mentor | Product preview card component",
      template: "src/index.html",
      filename: "./index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "src/index.html" }],
    }),
    new MiniCssExtractPlugin({
      filename: "style/[name].[contentHash].css",
    }),
    new CleanWebpackPlugin(),
    
  ],
};
*/
