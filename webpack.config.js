const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'client');


module.exports = {
    entry: {
        vendor: ['lodash'],
        bundle: path.join(dirApp, 'index')
    },
    resolve: {
        modules: [dirNode, dirApp]
    },
    plugins: [],
    module: {
        rules: [
            // BABEL
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    compact: true
                }
            },
            // CSS / SASS
            {
                test: /\.(scss)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    }
};