const path = require('path');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [{
                test: /\.scss$/,
                use: [
                    'style-loader',
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
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
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})],
    },
    resolve: {
        extensions: ['.js', '.ts'],
    }
};