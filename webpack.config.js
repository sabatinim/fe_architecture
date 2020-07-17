const path = require("path");

module.exports = {
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015','react']
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                use: ["ts-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js",".jsx", ".css"]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }
};
