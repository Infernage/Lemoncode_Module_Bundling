const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { merge } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
    mode: 'production',
    stats: 'verbose',
    devtool: false,
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass')
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        ts: 'esbuild-loader',
                        scss: [
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            {
                                loader: 'sass-loader',
                                options: {
                                    implementation: require('sass')
                                }
                            }
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css',
            chunkFilename: '[name].[contenthash:8].css',
        }),
        new Dotenv({
            path: './environments/prod.env'
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin()],
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: (module) => {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `vendor/${packageName.replace('@', '')}`;
                    },
                    priority: -10,
                    chunks: 'all'
                }
            },
            chunks: 'all'
        }
    },
})