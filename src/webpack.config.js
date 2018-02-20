const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (options) {
  const config = {
    entry: [
      './src/client/index.js'
    ],

    output: {
      filename: 'bundle.js',
      publicPath: '/',
      path: options.outputPath
    },

    plugins: [
      new webpack.ProvidePlugin({
        'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.ProgressPlugin(function (percentage, message) {
        const MOVE_LEFT = new Buffer('1b5b3130303044', 'hex').toString();
        const CLEAR_LINE = new Buffer('1b5b304b', 'hex').toString();
        process.stdout.write(CLEAR_LINE + Math.round(percentage * 100) + '%: ' + message + MOVE_LEFT);
      }),
      new ExtractTextPlugin('style.css', { allChunks: true })
    ],

    devtool: 'source-map',

    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            plugins: [
              'transform-decorators-legacy',
              'transform-object-rest-spread',
              'syntax-async-functions',
              'transform-async-to-generator',
              'transform-class-properties'
            ],
            presets: [
              'es2015',
              'react'
            ],
            env: {
              development: {
                plugins: [['react-transform', {
                  transforms: [{
                    transform: 'react-transform-hmr',
                    // if you use React Native, pass 'react-native' instead:
                    imports: ['react'],
                    // this is important for Webpack HMR:
                    locals: ['module']
                  }]
                }]]
              }
            }
          }
        },
        { test: /\.png$/, loader: 'url-loader?limit=' + String(1024 * 1024) + '&mimetype=image/png' },
        { test: /\.jpg$/, loader: 'url-loader?limit=' + String(1024 * 1024) + '&mimetype=image/jpeg' },
        { test: /\.svg$/, loader: 'url-loader?limit=' + String(1024 * 1024) + '&mimetype=image/svg+xml!svgo-loader' },
        {
          test: /\.scss$/,
          exclude: /third-party.scss$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-autoprefixer&modules&importLoaders=1&localIdentName=[name]__[local]!postcss-loader!sass-loader')
        },
        {
          test: /third-party.scss$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-autoprefixer&importLoaders=1!sass-loader')
        }
      ]
    },

    resolve: {
      modulesDirectories: ['node_modules', 'theme']
    }
  };

  if (options.dev) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new webpack.NoErrorsPlugin());
    config.entry.push('webpack-hot-middleware/client');
  } else {
    config.plugins.push(new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }));
    config.plugins.push(new webpack.optimize.DedupePlugin());
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      output: {
        comments: false
      }
    }));
    config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
  }

  return config;
};