import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';
import path from 'path';

export default function(app) {
  const config = webpackConfig({dev: true, outputPath: path.join(__dirname, 'dist')});

  // Use this middleware to set up hot module reloading via webpack.
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}