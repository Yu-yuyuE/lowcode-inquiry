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
            title: "lowcode-inquiry",
            template: path.join(__dirname, "../public/index.html"),
            filename: "index.html",
            hash: true,
            cache: false,
            inject: true,
            minify: {
                removeComments: true,
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
                minifyCSS: true // 缩小CSS样式元素和样式属性
            },
            nodeModules: path.resolve(__dirname, '../node_modules')
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new CssMinimizerWebpackPlugin(),
        // new webpack.NormalModuleReplacementPlugin(
        //     /\/WEBPACK_REPLACE_URL/g,
        //     resource => {
        //         resource.request = resource.request.replace(/\/WEBPACK_REPLACE_URL/g, process.env.API_URL);
        //     }
        // ),
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
};
