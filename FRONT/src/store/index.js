import { createStore, compose, applyMiddleware } from 'redux';

import reducer from './reducer';
import logMiddlleware from './LogMiddlleware';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// les enhancers représentent nos middleWares
const enhancers = composeEnhancers(
  applyMiddleware(logMiddlleware),
);

// on peut passer des "enhancers" à notre store
const store = createStore(
  reducer,
  enhancers,
);

export default store;
