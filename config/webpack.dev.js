const common = require('./webpack.common.js');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        ts: 'esbuild-loader',
                        scss: [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader'
                        ]
                    }
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new Dotenv({
            path: './environments/dev.env'
        }),
    ],
    devServer: {
        compress: true,
        port: 9000,
        hot: true,
    },
})