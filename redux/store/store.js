import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from '../reducers/index';
import apiMiddleware from "../middleware/api";

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: [
    'authReducer',
  ],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [
    'homeReducer',
  ],
};
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// TODO make configurable and only add logger in dev

const store = createStore(
  persistedReducer,
  applyMiddleware(
    thunk,
    apiMiddleware,
    createLogger(),
  ),
);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

export {
  store,
  persistor,
};