import React from 'react';
import Login from './src/screens/auth/Login';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import { persistedStore,  store } from './src/store/store';
import StackNavigation from './src/components/navigation/StackNavigation/StackNavigation';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <StackNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
