/* 
* @Author: kongzx
* @Date:   2020-02-22 21:19:18
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-24 18:21:17
*/

/**
 * 该文件其实最终要在 NODE 环境下执行的
 */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 新版本vue-loader需要
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 提取css
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
// 复制包
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 查看打包状态
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 是否处于 development 模式，用于 MiniCssExtractPlugin 插件
const devMode = process.env.NODE_ENV !== 'production'

const DIST_PATH = path.resolve(__dirname, '../web')
const LIB_PATH = path.resolve(__dirname, '../libs')
const PAGE_PATH = path.resolve(__dirname, '../src/js')

// 导出一个具有特殊属性配置对象
module.exports = {
  // 入口文件模块路径
  // entry: ['@babel/polyfill', './src/index.js', 'moment'],
  entry: {
    index: ['@babel/polyfill', './src/index.js'],
    // moment: ['@babel/polyfill', 'moment'],
  },
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
        // test: /\.css$/,
        test: /\.(le|c)ss$/,
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            options: {
              // publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader',
          'less-loader',

          // 从下往上运行
          // style-loader 的作用是动态创建style节点到 head中
          // 'style-loader',
          // css-loader 的作用是把css文件转为javascript 模块
          // 'css-loader', 
        ],
        exclude: /(libs)/
      },
      // {
      //   test: /\.less$/,
      //   use: [
      //     {
      //       loader: 'style-loader', // creates style nodes from JS strings
      //     },
      //     {
      //       loader: 'css-loader', // translates CSS into CommonJS
      //     },
      //     {
      //       loader: 'less-loader', // compiles Less to CSS
      //     },
      //   ],
      // },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name][hash:6].[ext]',
            outputPath: './img'
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash:6]',
            outputPath: './fonts',
            publicPath: '../fonts'
          }
        }]
      },
      {
        test: /\.m?js$/,
        // test: /\.js$/,
        // 排除 不转换这两个文件夹里面的js文件
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.vue$/,
        use: [
          'vue-loader',
        ],
      },
    ],
  },
  plugins: [
    // 该插件的作用就是把index.html 打包到你的bundle.js 文件所属目录 这个插件还可以压缩
    new HtmlWebpackPlugin({ 
      filename: 'index.html',
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? './css/[name].css' : './css/[name].[contenthash].css',
      chunkFilename: devMode ? './css/[id].css' : './css/[id].[contenthash].css',
    }),
    new CopyWebpackPlugin([
      {
        from: LIB_PATH,
        to: './libs',
        ignore: ['.*']
      }
    ]),
    // new BundleAnalyzerPlugin(),
    new VueLoaderPlugin()
  ],
  optimization: {
    //拆分公共包
    splitChunks: {
      cacheGroups: {
        // 第三方组件
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: "initial",
          name: "vendors",
          enforce: true
        },
        // mathjs: {
        //   test: "mathjs",
        //   priority: 1,
        //   chunks: "all",
        //   name: "mathjs",
        //   enforce: true
        // },
        // moment: {
        //   test: "moment",
        //   priority: 1,
        //   chunks: "all",
        //   name: "moment",
        //   enforce: true
        // },
      }
    }
  },
  resolve: {
    // 起别名
    alias: {
      // 'layui': ,
      '@libs': LIB_PATH,
      '@root': PAGE_PATH,
      // '@images': IMG_PATH,
      // '@api': path.resolve(__dirname, '.././src/api')
    }
  },
}