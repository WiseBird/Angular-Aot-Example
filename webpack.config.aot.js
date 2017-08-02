const path = require('path');
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
        extensions: ['.ts', '.js']
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
                use: 'raw-loader',
            },
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
    ]
};