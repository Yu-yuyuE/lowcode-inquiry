const config = require("./webpack.config");
const { merge } = require("webpack-merge");
const path = require('path');
const ReplacePlugin = require('webpack-replace-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = merge(config, {
    mode: "production",
    devtool: 'source-map',
    plugins: [
        new Dotenv({
            path: path.resolve(__dirname, '.env.production'), // 加载生产环境变量
        }),
    ],
});
