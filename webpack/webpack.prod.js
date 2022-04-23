const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')

const prodConfig = {
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
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    {
                        loader: 'postcss-loader',
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
    }
}

module.exports = merge(commonConfig, prodConfig)