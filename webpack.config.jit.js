// const path = require('path');
const webpack = require('webpack');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');

let postcssLoader = {
    loader: 'postcss-loader',
    options: {
        plugins: () => [
            require('autoprefixer')({browsers: 'last 3 Chrome versions'}),
        ],
    },
};

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
            {
                test: /.ts$/,
                use: [{
                    loader: 'ng-router-loader',
                    options: {
                        loader: 'async-import',
                        genDir: 'compiled',
                        aot: false,
                    }
                }, {
                    loader: 'awesome-typescript-loader',
                }, {
                    loader: 'angular2-template-loader',
                }],
            },
            {
                test: /\.(css|scss)/,
                use: ['to-string-loader', 'css-loader', postcssLoader, 'sass-loader'],
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
    ]
};