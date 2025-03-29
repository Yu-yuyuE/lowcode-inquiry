const config = require("./webpack.config");
const { merge } = require("webpack-merge");
const path = require('path');
const ReplacePlugin = require('webpack-replace-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(config, {
    mode: "production",
    devtool: false,
    plugins: [
        new Dotenv({
            path: path.resolve(__dirname, '.env.production'), // 加载生产环境变量
        }),
        new webpack.ids.DeterministicChunkIdsPlugin(), // 稳定chunk id
        new webpack.optimize.ModuleConcatenationPlugin() // 提升作用域
    ],
    parallelism: 2, // 限制并行数
    cache: false, // 禁用缓存
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: 2, // 限制压缩线程
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                },
            }),
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 20000, // 提升分块阈值
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true
                }
            }
        }
    },
});
