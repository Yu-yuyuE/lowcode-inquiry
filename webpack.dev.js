const config = require("./webpack.config");
const { merge } = require("webpack-merge");
const Dotenv = require('dotenv-webpack');
const path = require('path');
const ReplacePlugin = require('webpack-replace-plugin');
const webpack = require('webpack');

module.exports = merge(config, {
    mode: "development",
    devServer: {
        host: "localhost",
        port: "8888",
        // 无法访问路由时（Cannot GET /login），查看此配置
        historyApiFallback: true,
    },
    devtool: 'source-map',
    plugins: [
        new Dotenv({
            path: path.resolve(__dirname, '.env.development'), // 加载开发环境变量
        }),
    ]
});
