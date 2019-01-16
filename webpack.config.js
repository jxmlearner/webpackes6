const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")      // 把样式打包成文件只在生产环境下使用
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const webpack = require('webpack')
const devMode = process.env.NODE_ENV !== 'production'

module.exports ={
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$|\.styl$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: '[name].[hash:8].bundle.js',
        path: path.resolve(__dirname,'dist')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules:[
            {test: /\.css$/, use: [
                devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader'
            ]},
            {test: /\.styl$/, use: [
                devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader','stylus-loader'
            ]},
            {test: /\.js$/, include:[path.resolve(__dirname,'src'),path.resolve(__dirname,'node_modules/swiper'),path.resolve(__dirname,'node_modules/dom7')], use: ['babel-loader']},
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
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/assets/music'),
                to: path.resolve(__dirname, 'dist/music') 
            }
        ]),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        })
    ]
}