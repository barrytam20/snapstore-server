var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: {
        index: ['./src/handlers/index'],
        twilio: ['./src/handlers/twilio'],
        queue: ['./src/handlers/queue'],
        account: ['./src/handlers/account'],
        mapping: ['./src/handlers/mapping'],
        users: ['./src/handlers/users']
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
        extensions: ['.ts', '.js', '.tsx', '.jsx', '']
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.dist'),
        filename: '[name].js'
    },
    externals: [nodeExternals()]
};