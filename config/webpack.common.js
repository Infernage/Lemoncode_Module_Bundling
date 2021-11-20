const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcPath = path.join(__dirname, '..', 'src');

module.exports = {
    context: srcPath,
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.vue']
    },
    entry: {
        main: './index.ts'
    },
    output: {
        filename: '[name].[contenthash:8].bundle.js',
        chunkFilename: '[name].[contenthash:8].bundle.js',
        path: path.resolve(__dirname, '..', 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                loader: 'esbuild-loader',
                options: {
                    loader: 'tsx',
                    target: 'es5'
                }
            },
            {
                test: /\.(png|jpe?g|gif|web)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][contenthash:8][ext][query]'
                },
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(srcPath, 'index.html'),
            scriptLoading: 'blocking'
        }),
        new CleanWebpackPlugin(),
    ],
}