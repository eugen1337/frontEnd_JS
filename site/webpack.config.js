const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");

module.exports = {
    mode: "production",
    entry: "./script.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "script.bundle.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/template.html"), // шаблон
            filename: "index.html", // название выходного файла
        }),
        new CleanWebpackPlugin(),
    ],
};
