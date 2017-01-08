var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: {
        user: ['./src/handlers/user']
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
        extensions: ['.ts', '.js', '.tsx', '.jsx', '', '.json']
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.dist'),
        filename: '[name].js'
    },
    externals: [nodeExternals()]
};