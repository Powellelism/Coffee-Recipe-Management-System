// Import required modules
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const glob = require('glob');

const getEntries = () => {
    const entries = {};
    const pages = glob.sync('./*/index.js');

    pages.forEach((page) => {
        const pageName = path.dirname(page).replace('./', '');
        entries[pageName] = `./${pageName}/index.js`;
    });

    entries['common'] = './common/index.js';

    return entries;
};

module.exports = {
    mode: 'production',
    entry: getEntries(),
    output: {
        filename: '[name]/bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    optimization: {
        minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]/bundle.css',
        }),
    ],
};