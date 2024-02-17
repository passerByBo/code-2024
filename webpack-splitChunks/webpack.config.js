module.exports = {
    // entry: {
    //     app1: './src/index.js',
    //     app2: './src/index2.js',
    // },
    optimization: {
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks: {
            chunks: 'all', // 默认async   initial 
            cacheGroups: {

            },
            minSize: {
                javascript: 0,
                style: 0,
            },
            maxSize: {
                // jaavascript: 110000,
                // style: 110000
                javascript:  0,
                style: 0
            }
        },
    }
}