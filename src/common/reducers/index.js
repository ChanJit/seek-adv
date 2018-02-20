import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import postAdv from './postAdv';

const rootReducer = combineReducers({
  routing: routeReducer,
  form: formReducer,
  postAdv,
  config: (state = {}) => state
});

export default rootReducer;