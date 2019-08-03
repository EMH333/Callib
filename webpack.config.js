const path = require('path');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [{
                test: /\.scss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it uses publicPath in webpackOptions.output
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it uses publicPath in webpackOptions.output
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    "css-loader",
                ]
            },
            {
                test: /\.ts$/,
                use: 'ts-loader'
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'callib.js',
        library: 'callib'
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true
                    }
                }],
            },
            canPrint: true
        })
    ],
    resolve: {
        extensions: ['.js', '.ts'],
    }
};