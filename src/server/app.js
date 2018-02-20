import purchaseAdv from './api/purchaseAdv';
import Express from 'express';
import sass from 'node-sass';
import bodyParser from 'body-parser';
import compression from 'compression';
import finalhandler from 'finalhandler';
import errors from '../utilities/errors';

require('css-modules-require-hook')({
  generateScopedName: '[name]__[local]',
  extensions: ['.scss'],
  preprocessCss: (data, filename) =>
    sass.renderSync({
      data,
      file: filename
    }).css
});

const handleRender = require('./render').default;
const { uncaught } = errors;
const app = new Express();

app.use(compression());

function toCallBack(promise) {
  return function () {
    const done = arguments[arguments.length - 1];
    promise.apply(this, arguments).then(() => done()).catch((err) => done(err));
  };
}

if (global.__devMiddleware) {
  global.__devMiddleware(app);
}

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(Express.static(__dirname + '/../static'));

app.get('/_healthcheck', (req, res) => {
  res.send('OK');
});

app.post('/api/purchaseAdv', toCallBack(purchaseAdv));
app.use(handleRender);

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const _send = res.send;
  const sent = false;
  res.send = function (data) {
    if (sent) { 
      return; 
    }
    _send.bind(res)(data);
    sent = true;
  };
  next();
  res.error = err;
  uncaught(req, res, req.route, err);

  (finalhandler(req, res, {
    env: app.get('env'),
    onerror: () => { }
  }))(err);
});

export default app;