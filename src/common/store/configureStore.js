import { createStore, applyMiddleware } from 'redux';
import clientMiddleware from './middleware/clientMiddleware';
import promise from 'redux-promise';
import rootReducer from '../reducers';
import { syncHistory } from 'react-router-redux';

export default function configureStore(initialState, browserHistory, fetch) {
  const middleware = [clientMiddleware(fetch), promise];
  const reduxRouterMiddleware = syncHistory(browserHistory);
  middleware.push(reduxRouterMiddleware);

  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
