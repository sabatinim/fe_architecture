const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/App.ts",
    module: {
        rules: [
            {
                test: /\.js/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.ts/,
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
        extensions: [".ts", ".js", ".css"]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    }
};