import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import UserSlice from './Slice/UserSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, UserSlice);

const store = configureStore({
  reducer: persistedReducer,
});

const persistedStore = persistStore(store);

export {store, persistedStore};
