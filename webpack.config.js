const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports ={
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname,'dist')
    },
    module: {
        rules:[
            {test: /\.css$/, use: ['style-loader','css-loader']},
            {test: /\.styl$/, use: ['style-loader','css-loader','stylus-loader']},
            {test: /\.js$/, exclude: /node_modules/, use: ['babel-loader']},
            {test: /\.(png|jpg|gif|svg)$/, use: ['file-loader']},
            {
                test: require.resolve('zepto'),
                loader: 'exports-loader?window.Zepto!script-loader'
            },
            {
                test:/node_modules\/zepto\/src\/\*.js/,
                loader: 'exports-loader?!script-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: '首页',
            template: 'index.html'
        }),
        new webpack.ProvidePlugin({
            $: 'zepto',
            Zepto: 'zepto'
        })
    ]
}