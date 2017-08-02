const path = require('path');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const ngToolsWebpack = require('@ngtools/webpack');

var _root = path.resolve(__dirname, '..');
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}


module.exports = {
    entry: './src/index.ts',
    output: {
        filename: './bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            { test: /.ts$/, use: '@ngtools/webpack', exclude: /node_modules/ }
        ]
    },
    plugins: [
        new NamedModulesPlugin(),
        new ngToolsWebpack.AotPlugin({
            tsConfigPath: './tsconfig.json',
            skipMetadataEmit: true,
            entryModule: 'src/app/app.module#AppModule',
        }),
    ]
};