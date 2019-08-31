import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Reactotron from 'reactotron-react-native';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? Reactotron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const enhancer =
  process.env.NODE_ENV === 'development'
    ? compose(
        applyMiddleware(sagaMiddleware),
        console.tron.createEnhancer()
      )
    : sagaMiddleware;

const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
