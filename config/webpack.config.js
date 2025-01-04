const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: { app: path.join(__dirname, "../src/index.tsx") },
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "[name].[chunkhash:4].js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "react-demo",
            template: path.join(__dirname, "../public/index.html"),
            filename: "index.html"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new CssMinimizerWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)/,
                loader: "babel-loader"
            },
            {
                test: /\.(sass|scss)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
            },
            {
                test: /\.(less)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "less-loader"]
            },
            {
                test: /\.(css)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".json", ".js", ".jsx"],
        alias: {
            "@": path.join(__dirname, "../src")
        }
    },
    stats: {
        modules: false
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    },
    devServer: {
        // 无法访问路由时（Cannot GET /login），查看此配置
        historyApiFallback: true,
    },
};
