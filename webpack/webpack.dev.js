const path = require('path')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')

const devServer = {
    static: {
        directory: path.join(__dirname, '..', 'demo'),
        publicPath: '/'
    },
    port: 9000,
    compress: true
}

const devConfig = {
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.png$/,
                loader: 'file-loader'
            },
            {
                test: /\.art$/,
                loader: 'art-template-loader'
            },
            {
                test: /\.mp3/,
                loader: 'file-loader'
            }
        ]
    },
    devServer
}

module.exports = merge(commonConfig, devConfig)