/* 
* @Author: kongzx
* @Date:   2020-02-22 21:19:18
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-22 23:55:18
*/

/**
 * 该文件其实最终要在 NODE 环境下执行的
 */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST_PATH = path.resolve(__dirname, '../web')

// 导出一个具有特殊属性配置对象
module.exports = {
  // 入口文件模块路径
  entry: './src/index.js',
  output: {
    // // 出口文件模块所属目录 path必须是绝对路径
    // path: path.join(__dirname, './dist/'),
    // // 打包的结果文件名称
    // filename: 'bundle.js'
    filename: './js/bundle.[name].[hash].js',
    chunkFilename: './js/chunk.[name].[chunkhash].js',
    // 所有输出文件的目标路径
    path: DIST_PATH,
    // 资源路径，和 HTML 目录相同
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 从下往上运行
          // style-loader 的作用是动态创建style节点到 head中
          'style-loader',
          // css-loader 的作用是把css文件转为javascript 模块
          'css-loader', 
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },

    ],
     
  },
  plugins: [
    // 该插件的作用就是把index.html 打包到你的bundle.js 文件所属目录
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
  ]
}