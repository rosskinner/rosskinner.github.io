const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { name, description } = require('./package.json')

module.exports = exports = (env, { mode = 'production' }) => {
  const plugins = [
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ]
  if (mode === 'production') {
    // only clean folder on production build
    plugins.unshift(new CleanWebpackPlugin())
  }
  return {
    entry: './src/index',
    output: {
      path: path.join(__dirname, 'docs'),
      publicPath: mode !== 'production' ? '/' : `/${name}/`
    },
    module: {
      rules: [{
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                useBuiltIns: 'entry',
                corejs: 3,
                targets: {
                  chrome: '77',
                  safari: '12.1',
                  firefox: '70',
                  ie: '11'
                }
              }],
              '@babel/preset-react'
            ],
            plugins: [
              '@babel/plugin-transform-runtime'
            ]
          }
        }
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.(png|svg|jpg|jpeg|gif|ico|mp4|webm|otf|ico)$/,
        exclude: /node_modules/,
        loader: 'file-loader', // ?name=[name].[ext] is only necessary to preserve the original file name,
        options: {
          name: '[path][name].[ext]',
        },
      }
      ]
    },
    devServer: {
      historyApiFallback: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: name,
        inject: 'head',
        meta: {
          viewport: 'width=device-width, initial-scale=1.0',
          description
        },
        favicon: 'src/assets/images/favicon.ico',
        template: 'src/index.html'
      }),
      new DefinePlugin({
        'process.env.BUILD_ENV': JSON.stringify(process.env.BUILD_ENV)
      })
    ],
    resolve: {
      /*
        Reorder the main-fields so that module is the lowest priority, this
        hotfixes an issue which caused non es5 code to be shipped in the build.
      */
      mainFields: ['browser', 'main', 'module'],
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    watch: mode !== 'production'
  }
}
