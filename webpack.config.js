var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: {
        image: ['./src/handlers/image']
    },
    target: 'node',
    module: {
        loaders: [
            {
                test: /\.ts(x?)$/,
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx', '', '.json','jpg']
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.dist'),
        filename: '[name].js'
    },
    externals: [nodeExternals()]
};