const config = require("./webpack.config");
const { merge } = require("webpack-merge");

module.exports = merge(config, {
    mode: "development",
    devServer: {
        host: "localhost",
        port: "8888",
        // 无法访问路由时（Cannot GET /login），查看此配置
        historyApiFallback: true,
    },
    devtool: 'source-map',
});
