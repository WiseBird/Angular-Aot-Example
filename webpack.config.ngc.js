const path = require('path');
const webpack = require('webpack');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const ngcWebpack = require('ngc-webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

let postcssLoader = {
    loader: 'postcss-loader',
    options: {
        plugins: () => [
            require('autoprefixer')({browsers: 'last 3 Chrome versions'}),
        ],
    },
};

let cssLoaders = [
    {
        loader: 'css-loader',
        options: {
            minimize: true,
        }
    },
    postcssLoader,
    'sass-loader',
];

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'bundle'),
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
            'resizeSensor': 'css-element-queries/src/ResizeSensor.js',
            "home": path.resolve('./src/app/home'),
        }
    },
    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'loaders'),
        ],
    },
    module: {
        rules: [
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                use: [ '@ngtools/webpack' ]
            },
            {
                test: /app.*\.(css|scss)$/,
                use: ['to-string-loader', ...cssLoaders],
            },
            {
                test: /\.(css|scss)$/,
                exclude: /app/,
                use: [MiniCssExtractPlugin.loader, ...cssLoaders],
            },
            {
                test: /\.html$/,
                use: [
                    'html-loader',
                    'custom-loader',
                ],
            },
            {test: /\.(png|ico|gif)$/, loader: "file-loader?name=bundle.[name].[ext]"}
        ]
    },
    plugins: [
        new NamedModulesPlugin(),
        new ngcWebpack.NgcWebpackPlugin({
            tsConfigPath: './tsconfig.json',
            entryModule: 'src/app/app.module#AppModule',
        }),
        new MiniCssExtractPlugin({filename: "bundle.css"}),
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
            chunksSortMode: 'none',
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new ProgressBarPlugin(),
    ],
    optimization: {
        minimizer: [],
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },
    },
};