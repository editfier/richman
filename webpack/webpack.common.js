/** webpack.common.js
 * @created 2022-4-13
 * @updated 2022-4-13
 */

const path = require('path')

const commonConfig = {
    entry: {
        richman: './src/js/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, '..', 'dist'),
        library: {
            name: 'Richman',
            type: 'umd',
            export: 'default'
        }
    },
    // art-template-loader
    resolve: {
        preferRelative: true,
        extensions: ['.js', '.scss']
    }
}

module.exports = commonConfig

