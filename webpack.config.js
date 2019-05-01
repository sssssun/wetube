const path=require("path");
const autoprefixer=require("autoprefixer");
const ExtractText = require("extract-text-webpack-plugin");

//entry point : 어떤 모듈을 사용해서 시작할지, output: 만들어진 파일 어떤 파일명, 어떤 폴더에 넣을지
const ENTRY_FILE=path.resolve(__dirname, "assets","js","main.js");
const OUTPUT_DIR=path.join(__dirname,"static");

module.exports={
    entry: ["@babel/polyfill",ENTRY_FILE],
    mode: process.env.WEBPACK_ENV,
    module: {
        rules: [
            {
                test:/\.js$/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test:/\.scss$/,
                use: ExtractText.extract(
                    [
                    {
                        loader: "css-loader"
                    },
                    {
                        loader:"postcss-loader",
                        options: {
                            plugins(){
                                return [autoprefixer({browsers:"cover 99.5%"})];
                            }
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
                    
                )
                
                
            }
        ]
    },
    output: {
        path: OUTPUT_DIR,
        filename: "[name].js"
    },
    plugins: [
        new ExtractText("styles.css")
        
    ]
    
};
