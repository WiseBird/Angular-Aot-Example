// const path = require('path');
const webpack = require('webpack');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const ngcWebpack = require('ngc-webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let postcssLoader = {
    loader: 'postcss-loader',
    options: {
        plugins: () => [
            require('autoprefixer')({browsers: 'last 3 Chrome versions'}),
        ],
    },
};

module.exports = {
    entry: './src/index-aot.ts',
    output: {
        filename: './bundle.js'
    },
    resolve: {
        modules: [
            "../node_modules",
        ],
        extensions: [
            '.ts',
            '.js',
            '.html',
            '.scss',
        ],
        alias: {
            "caja": "html-css-sanitizer",
            'resizeSensor': 'css-element-queries/src/ResizeSensor.js'
        }
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
                test: /app.*\.(css|scss)/,
                use: ['to-string-loader', 'css-loader', postcssLoader, 'sass-loader'],
            },
            {
                test: /\.(css|scss)$/,
                exclude: /app/,
                loader: ExtractTextPlugin.extract({
                    use: ['css-loader', postcssLoader, 'sass-loader'],
                })
            },
            {
                test: /\.html$/,
                use: 'html-loader',
            },
            {test: /\.(png|ico|gif)$/, loader: "file-loader?name=bundle.[name].[ext]"}
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
        new ExtractTextPlugin("bundle.css"),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            d3: "d3",
            _: "lodash"
        }),
        new webpack.ContextReplacementPlugin(/node_modules\/moment\/locale/, /en-gb/),
        new webpack.NormalModuleReplacementPlugin(
            /ng2-bootstrap.+moment/,
            function (arg) {
                arg.request = arg.request.replace('node_modules/ng2-bootstrap/', '');
            }
        ),
    ]
};