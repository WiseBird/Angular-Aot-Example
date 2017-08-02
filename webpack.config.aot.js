const path = require('path');
const webpack = require('webpack');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const ngToolsWebpack = require('@ngtools/webpack');
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
    entry: './src/index.ts',
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
            { test: /.ts$/, use: '@ngtools/webpack' },
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
        new ngToolsWebpack.AotPlugin({
            tsConfigPath: './tsconfig.json',
            skipMetadataEmit: true,
            entryModule: 'src/app/app.module#AppModule',
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