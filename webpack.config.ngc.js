// const path = require('path');
const webpack = require('webpack');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const ngcWebpack = require('ngc-webpack');

module.exports = {
    entry: './src/index-aot.ts',
    output: {
        filename: './bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /.ts$/,
                use: [{
                    loader: 'ng-router-loader',
                    options: {
                        loader: 'async-import',
                        genDir: 'compiled',
                        aot: true,
                    }
                }, {
                    loader: 'awesome-typescript-loader',
                }, {
                    loader: 'ngc-webpack',
                    options: {
                        disable: false,
                    }
                }, {
                    loader: 'angular2-template-loader',
                }],
            },
            {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader'],
            },
            {
                test: /\.html$/,
                use: 'raw-loader',
            },
        ]
    },
    plugins: [
        new NamedModulesPlugin(),
        // Suppressing warnings: 'Critical dependency: the request of a dependency is an expression'
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            'src'
        ),
        new ngcWebpack.NgcWebpackPlugin({
            disabled: false,
            tsConfig: './tsconfig.json',
        }),
    ]
};