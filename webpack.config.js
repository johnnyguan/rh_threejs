module.exports = {
    entry: {
        'rhyton_three':__dirname + '/src/index.js'
    },
    output: {
        path: __dirname + '/dist',
        filename:'[name].js'
    },
    devtool:'source-map',
    module: {
        rules: [
            {
                test:/(\.js)$/,
                use: {
                    loader:'babel-loader'
                },
                exclude:/node_modules/
            }
        ]
    }
}