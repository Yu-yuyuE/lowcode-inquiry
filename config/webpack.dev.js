const config = require("./webpack.config");
const { merge } = require("webpack-merge");

module.exports = merge(config, {
    mode: "development",
    devServer: {
        host: "localhost",
        port: "8888"
    }
});
