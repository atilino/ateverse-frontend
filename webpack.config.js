const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            assets: path.resolve(__dirname, 'src/assets'),
            constants: path.resolve(__dirname, 'src/constants'),
            components: path.resolve(__dirname, 'src/components'),
            utilities: path.resolve(__dirname, 'src/utilities'),
            hooks: path.resolve(__dirname, 'src/hooks')
        },
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './public',
        historyApiFallback: true,
        open: true,
        hot: true,
        compress: true,
        port: 4000
    },
    plugins: [
        new webpack.ProvidePlugin({
            'React': 'react'
          })
    ],
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: [/\.js$/, /\.jsx$/],
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
