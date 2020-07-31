import { combineReducers } from 'redux';
import auth from './auth';
import post from './post';

// function createFilteredReducer(reducerFunction, reducerPredicate) {
//   return (state, action) => {
//     const isInitializationCall = state === undefined;
//     const shouldRunWrappedReducer = reducerPredicate(action) || isInitializationCall;
//     return shouldRunWrappedReducer ? reducerFunction(state, action) : state;
//   }
// }

const rootReducer = combineReducers({
  auth: auth,
  home: post,
  // TODO 
  // create link between screen actions and filtered reducer actions
  //  create types for reducers
  // home: createFilteredReducer(post, action => action.name === reducers.home), 
});

export default rootReducer;