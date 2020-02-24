// 配置合并插件
const merge = require('webpack-merge')
const webpack = require('webpack');
// 通用配置
const common = require('./webpack.common.js');

module.exports = merge(common, {
  // 模式
  mode: 'development',
  // 编译后的代码映射模式
  devtool: 'inline-source-map',
  // 配置开发服务器路径，将 dist 目录下文件视为可访问文件，默认 localhost:8080 建立服务
  devServer: {
    contentBase: '../dist',
    port: 8058,
    // 热更新
    hot: true,
    openPage: '#index'
  },
  plugins: [
    // 更容易查看要修补(patch)的依赖
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
})
