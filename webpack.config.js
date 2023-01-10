// 引入一个包
const path = require('path');
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
// 引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// webpack中的所有的配置信息都应该写在module.exports中
module.exports = {
  // 指定入口文件
  entry: "./src/main.ts",
  // 指定打包文件所在目录
  output: {
    // 指定打包文件的目录
    path: path.resolve(__dirname, 'dist'),
    // 打包后文件的文件
    filename: "app.js",
  },
  // 指定webpack打包时要使用模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // test指定的是规则生效的文件 就是只打包后缀为ts的文件
        test: /\.ts$/,
        // 要使用的loader
        use: [
          // 加载TS
          'ts-loader'
        ],
        // 要排除的文件 不编译这个文件下的文件
        exclude: /node-modules/
      }
      
    ]
  },
  // 配置Webpack插件  webpack中html插件，用来自动创建html文件，并且自动引用编译的js文件。
  plugins: [
    // 清空dist目录
    new CleanWebpackPlugin(),
    // 生成html
    new HTMLWebpackPlugin({
      // 模板文件
      template: "./src/index.html",
      favicon: path.resolve(__dirname, 'src/favicon.png'),
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),
  ],

  // 用来设置引用的文件类型
  resolve: {
    extensions: ['.ts', '.js']
  },
  // 配置本地服务
  devServer: {
    // 热更新
    hot: true,
    // 端口号
    port: 9527
  },
}