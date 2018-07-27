const path              = require('path');
const webpack           = require('webpack');
const htmlPlugin        = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

const PATHS = {
  app: path.join(__dirname, 'src'),
  images:path.join(__dirname,'src/assets/'),
  build: path.join(__dirname, 'dist')
};


const options = {
  host:'localhost',
  port:'1234'
};

module.exports = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.[hash].js'
  },
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 
    'errors-only',
    host: options.host,
    port: options.port 
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            loaders: {
              js: 'babel-loader',
              css: ['vue-style-loader', 'css-loader']
            }
          }
        }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['es2015']
          }
        }]
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
        include:PATHS.app
      },
      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,        
        use: [{
          loader:'url-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }]
      }
    ],
  },
  resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      },
      extensions: ['*', '.js', '.vue', '.json']
  },
  plugins:[
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new htmlPlugin({
      template:path.join(PATHS.app,'index.html'),
      inject:'body'
    }),
  ]
};
