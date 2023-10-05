import { combineReducers } from 'redux';
import userReducer from './userReducer';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    // key: 'root',
    storage: storage,
}

const userPersistConfig = {
    ...persistConfig,
    key: 'user',
    blacklist: ['isLoading', 'isError', 'account.token']
};


const rootReducer = combineReducers({

    user: persistReducer(userPersistConfig, userReducer),

});

export default rootReducer;