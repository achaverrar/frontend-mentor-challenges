const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // Cleans dist/ every time a bundle is generated
  },
  devServer: {
    static: "./dist",
  },
  module: {
    rules: [
      {
        // Loads the JS files, minifies them and
        // prepares them for backwards compatibility
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
          // It has to go in this order:
          // Creates `style` nodes from JS strings
          // Not needed if MiniCssExtractPlugin is being used
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        // Only needed to load background images and
        // images imported to the JS files
        test: /\.(png|svg|jpe?g|gif|webp)$/,
        type: "asset/resource",
        generator: {
          filename: "./images/[name][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "./fonts/[name][ext]",
        },
      },
    ],
  },
  plugins: [
    // Loads and uses the HTML template and stores the result in dist/
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    // Copies images folder from src/ to dist/ so that
    // the HTML template has access to it
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "images"),
          to: "images",
        },
      ],
    }),
  ],
  // Use for development only
  devtool: "source-map",
};
