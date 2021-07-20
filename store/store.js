import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import withRedux from 'next-redux-wrapper'

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
  
);

// export default store;
 


// const initStore = (initialState = {}) => {
//   const middleware = composeWithDevTools(applyMiddleware(thunk))
//   return createStore(rootReducer, initialState, middleware)
// }

// const store = page => withRedux(initStore)(page)

export default store