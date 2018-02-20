import styles from '../app.scss'; //eslint-disable-line no-unused-vars
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, match } from 'react-router';
import { isClient } from '../common/helpers/detection';
import debug from 'debug';
import configureStore from '../common/store/configureStore';
import Routes from '../common/Routes';
import HttpsRedirect from 'react-https-redirect';

const clientDebug = debug('app:client');
const rootElement = document.getElementById('app');

window.React = React; //For chrome dev tool support
window.reduxDebug = debug;
window.reduxDebug.enable('*'); //this should be activated only on development env

const store = configureStore(window.__INITIAL_STATE__, browserHistory, fetch);
const routes = new Routes(store).createRoutes();

let initialLoad = true;

browserHistory.listen(location => {
  match(
    { routes, location },
    async (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        return;
      }

      const getReduxPromise = async function () {
        const { query, params } = renderProps;
        const comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;
        if (comp && comp.fetchData) {
          await comp.fetchData({ query, params, store, history });
        }
      };

      if (initialLoad) {
        initialLoad = false;
      } else {
        await getReduxPromise();
      }
    });
});

const routeUpdate = () => {
  if (isClient()) {
    window.scrollTo(0, 0);
  }
};

clientDebug('rehydrating app');

render(
  <Provider store={store}>
    <HttpsRedirect>
      <Router onUpdate={routeUpdate} routes={routes} history={browserHistory}/>
    </HttpsRedirect>
  </Provider>,
  rootElement
);
