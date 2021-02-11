const path = require('path');
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
    name: 'todolist',
    mode: 'development', // 배포는 production
    devtool: 'eval',
    resolve: { 
        extensions: ['.js', '.jsx'],
    },

    entry: {
        app: ['./client'],
    }, 
    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                "presets": [
                    "@babel/preset-env",
                    "@babel/preset-react"
                ],
                "plugins": ["@babel/plugin-proposal-class-properties"]
            },
        }],
    },
    plugins: [
        new RefreshWebpackPlugin(),
    ],
    output: {
        path: path.join(__dirname, 'dist'), 
        filename: 'app.js',
        publicPath: '/dist/',
    }, 
    devServer: {
        publicPath: '/dist/',
        hot: true,
    },
}
