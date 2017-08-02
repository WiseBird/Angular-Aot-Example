// const path = require('path');
const webpack = require('webpack');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let postcssLoader = {
    loader: 'postcss-loader',
    options: {
        plugins: () => [
            require('autoprefixer')({browsers: 'last 3 Chrome versions'}),
        ],
    },
};

function isExternal(module) {
    let userRequest = module.userRequest;

    if (typeof userRequest !== 'string') {
        return false;
    }

    return userRequest.indexOf('node_modules') >= 0;
}

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: './bundle.[name].js',
        library: '[name]',
        libraryTarget: "var"
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
                        aot: false,
                    }
                }, {
                    loader: 'awesome-typescript-loader',
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
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true,
            filename: "bundle.html",
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor"],
            minChunks: isExternal
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["manifest"],
            minChunks: Infinity
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new ProgressBarPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                drop_console: false,
                warnings: false,
            },
        }),
        new OptimizeJsPlugin({
            sourceMap: false
        }),
        // new OptimizeCssAssetsPlugin({
        //     cssProcessorOptions: {
        //         discardUnused: false,
        //         discardDuplicates: {removeAll: true},
        //         discardComments: {removeAll: true},
        //         zindex: false,
        //         reduceIdents: false,
        //     },
        //     canPrint: false,
        // }),
    ]
};