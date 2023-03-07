const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    fallback: {
      https: require.resolve("https-browserify"),
      url: require.resolve("url/"),
      os: require.resolve("os-browserify/browser"),
      stream: require.resolve("stream-browserify"),
      querystring: require.resolve("querystring-es3"),
      crypto: require.resolve("crypto-browserify"),
      path: require.resolve("path-browserify"),
      assert: require.resolve("assert/"),
    },
  },
  node: {
    global: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },
};
