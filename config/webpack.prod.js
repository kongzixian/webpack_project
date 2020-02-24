const path = require('path')
// 配置合并插件
const merge = require('webpack-merge')
// 通用配置
const common = require('./webpack.common.js')
// 清除文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// 项目路径
const ROOT_PATH = path.resolve(__dirname, '../')
// 压缩css
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// 压缩js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = merge(common, {
  // 模式
  mode: 'production',// 编译后的代码映射模式
  // devtool: 'inline-source-map',
  plugins: [
    // 需要指定根路径，否则报错 CleanWebpackPlugin is outside of the project root
    // new CleanWebpackPlugin('web', {
    //   root: ROOT_PATH
    // }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        uglifyOptions: {
          mangle: false
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
})
