const path = require("path")

module.exports = {
    mode: 'production',
    entry : path.resolve(__dirname,"./src/index.ts"),
    output:{
        path: path.resolve(__dirname,"dist"),
        filename: "bundle.js",
    },
    module:{
        // 制定加载的规则
        rules:[
            {
                test:/\.ts$/,  // 规则生效文件
                use:'ts-loader', // 规则使用文件
                exclude: /node-moudles/ // 规则跳过文件
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
}
