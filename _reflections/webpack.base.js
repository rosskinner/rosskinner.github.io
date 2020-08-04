const path = require('path')
const webpack = require('webpack')

module.exports = function (env, args) {
  const o = {
    target: 'web',
    mode: env || 'development',
    entry: {
      index: path.join(__dirname, `./src/index.js`)
    },
    output: {
      path: path.join(__dirname, '../docs/assets/reflections'),
      publicPath: '/assets/reflections/',
      filename: `[name].bundle.js`,
      chunkFilename: '[name].bundle.js'
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-transform-spread',
              '@babel/plugin-transform-async-to-generator',
              '@babel/plugin-syntax-dynamic-import'
            ],
            presets: ['@babel/preset-env']
          }
        }
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        loader: 'file-loader',
        test: /\.(png|jpg|gif|svg|mp4|mp3)$/,
        options: {
          name: '[name].[ext]?[hash]'
        }
      }, {
        test: /\.(glsl|frag|vert)$/,
        use: 'raw-loader',
        exclude: /node_modules/
      }]
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env)
      })
    ],

    externals: [ 'canvas' ],

    optimization: {
      minimize: env === 'production'
    }
  }

  if (env === 'development') {
    o.devtool = 'cheap-module-source-map'
    o.watch = true
    o.watchOptions = {
      aggregateTimeout: 1000, // in ms
      poll: 500
    }
  }

  return o
}
