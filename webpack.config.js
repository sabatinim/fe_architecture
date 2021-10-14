const path = require("path");

module.exports = {
    entry: "./src/App.ts",
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
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3000,
    devMiddleware: {
      publicPath: "https://localhost:3000/dist/",
    },
    hot: "only",
  },
};