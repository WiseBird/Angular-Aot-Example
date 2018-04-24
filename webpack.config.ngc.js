const path = require('path');
const webpack = require('webpack');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const ngcWebpack = require('ngc-webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
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
                loader: ExtractTextPlugin.extract({
                    use: [...cssLoaders],
                })
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
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         unused: true,
        //         dead_code: true,
        //         drop_console: false,
        //         warnings: false,
        //     },
        // }),
    ]
};