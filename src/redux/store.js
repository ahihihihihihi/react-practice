import { applyMiddleware, createStore } from 'redux';

import rootReducer from './reducers/rootReducer';

import { persistStore } from 'redux-persist'

import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

let persistor = persistStore(store)

export { store, persistor }