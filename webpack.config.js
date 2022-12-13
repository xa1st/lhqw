// 引入内置path方便得到绝对路径
const path = require('path');
// 引入模板组件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// JS压缩
const TerserWebpackPlugin = require("terser-webpack-plugin");
// 移动静态文件到dist
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
  // 生产模式
  mode: 'production',
  // 入口文件地址
  entry: './src/main.ts',
  output: {
    // 出口文件，即打包后的文件存放地址
    path: path.resolve(__dirname, "./dist"),
    filename: 'lhqw.min.js' // 文件名
  },
  devServer: {
    static:{
      directory: path.join(__dirname, './public')
    }
  },
  resolve: {
    // 配置文件引入时省略后缀名
    extensions:['.ts', '.js', '.cjs', '.json'] 
  },
  module: {
    // 解释器
    rules: [{
      //  匹配规则 以ts结尾的文件
      test: /\.ts$/, 
      // 对应文件采用ts-loader进行编译
      loader: 'ts-loader' 
    }]
  },
  plugins: [
    //  使用模板地址
    new HtmlWebpackPlugin({ 
      template: './public/index.html' 
    }),
    new TerserWebpackPlugin({
      test: /\.js(\?.*)?$/i, // 匹配参与压缩的文件
      parallel: true, // 使用多进程并发运行
      terserOptions: {
        //Terser 压缩配置
        output: { comments: false },
        compress: {
          pure_funcs: ["console.log"], // 去除console.log
        },
      },
      extractComments: false, // 将注释剥离到单独的文件中
    }),
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [{ 
            source: path.join(__dirname, './public/favicon.ico'),
            destination: path.join(__dirname, './dist/favicon.ico')
          }]
        }
      }
    })
  ]
}