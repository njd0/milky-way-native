import { combineReducers } from 'redux';

import authReducer from './authReducer';
import homeReducer from './homeReducer';

function createFilteredReducer(reducerFunction, reducerPredicate) {
  return (state, action) => {
      const isInitializationCall = state === undefined;
      const shouldRunWrappedReducer = reducerPredicate(action) || isInitializationCall;
      return shouldRunWrappedReducer ? reducerFunction(state, action) : state;
  }
}

// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer: authReducer,
  homeReducer: createFilteredReducer(homeReducer, action => action.name === 'HOME'), // TODO create types for reducers
});

export default rootReducer;