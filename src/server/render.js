import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'react-router';

import Routes from '../common/Routes';
import configureStore from '../common/store/configureStore';

import fetch from 'node-fetch';
import serialize from 'serialize-javascript';

const config = require('./config.localdev');

function renderFullPage(html, initialState) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Seek Adv</title>
        <link rel="stylesheet" type="text/css" href="style.css" />
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${serialize(initialState)}
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>`;
}

export default function handleRender(req, res) {
  const initialState = { config: config };
  const history = createMemoryHistory('/signin');
  const fetchWithCredentials = (url, options) => fetch(url, { ...options, headers: { ...options.headers, 'Cookie': req.get('Cookie') } });

  const store = configureStore(initialState, history, fetchWithCredentials);
  const routes = new Routes(store).createRoutes();

  match(
    { routes: routes, location: req.originalUrl },
    async (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        res.status(500);
      } else if (!renderProps) {
        res.status(500);
      } else {
        const isNotFound = renderProps.routes.filter((route) => {
          return route.status === 404;
        }).length > 0;

        const component =
          (<Provider store={store}>
            <div>
              <RouterContext {...renderProps} />
            </div>
          </Provider>);

        const getReduxPromise = async function getReduxPromise() {
          const { location: { query }, params } = renderProps;
          const comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;
          if (comp && comp.fetchData) {
            await comp.fetchData({ query, params, store, history });
          }
        };

        try {
          await getReduxPromise();
        } catch (err) {
          res
            .status(500)
            .send(err);

          return;
        }

        let html;

        try {
          html = renderToString(component);
        } catch (ex) {
          res
            .status(500)
            .send(ex);

          return;
        }

        try {
          res
          .status(isNotFound ? 404 : 200)
          .send(renderFullPage(html, store.getState()));
        } catch (ex) {
          //doing nothing
        }
        
      }
    }
  );
}
