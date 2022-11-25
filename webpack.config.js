const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dotenv = require('dotenv');

module.exports = () => {
    const env = dotenv.config().parsed;

    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, '/public'),
            filename: '[name].[contenthash].js',
            clean: true,
            publicPath: '/'
        },
        resolve: {
            alias: {
                '/': path.resolve(__dirname, 'src/'),
                assets: path.resolve(__dirname, 'src/assets'),
                models: path.resolve(__dirname, 'src/models'),
                constants: path.resolve(__dirname, 'src/constants'),
                components: path.resolve(__dirname, 'src/components'),
                utilities: path.resolve(__dirname, 'src/utilities'),
                hooks: path.resolve(__dirname, 'src/hooks')
            },
            extensions: ['*', '.js', '.jsx'],
        },
        devtool: 'inline-source-map',
        devServer: {
            static: './public',
            historyApiFallback: true,
            open: true,
            hot: true,
            compress: true,
            port: 4000,
        },
        plugins: [
            new webpack.DefinePlugin(envKeys),
            new webpack.ProvidePlugin({
                'React': 'react'
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'src/index.html',
            })
        ],
        module: {
            rules: [
                {
                    use: 'babel-loader',
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/
                },
                {
                    use: [
                        'style-loader',
                        'css-loader'
                    ],
                    test: /\.css$/,
                },
                {
                    loader: 'file-loader',
                    test: /\.(png|jpe?g|gif)$/i,
                    options: {
                        outputPath: 'images'
                    },
                },
            ]
        }
    }
}
