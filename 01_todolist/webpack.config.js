const path = require('path');
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
    name: 'todolist',
    mode: 'development', // 배포는 production
    devtool: 'eval',
    resolve: { //파일확장자명 알아서 찾아줌
        extensions: ['.js', '.jsx'],
    },

    entry: {
        app: ['./client'],
    }, //입력
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
    ],  // 기본적인 모듈 외에 확장프로그램 필요할때
    output: {
        path: path.join(__dirname, 'dist'), // 현재폴더경로 + dist 
        filename: 'app.js',
        publicPath: '/dist/',
    }, //출력
    devServer: {
        publicPath: '/dist/',
        hot: true,
    },
}
