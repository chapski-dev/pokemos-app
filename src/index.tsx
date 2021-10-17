import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reduxLogger from 'redux-logger'
import 'antd/dist/antd.css';
import createSagaMiddleware from '@redux-saga/core';
import { applyMiddleware, compose, createStore } from 'redux';
import { reducer } from './reducers/index';
import { Provider } from 'react-redux';
import { sagaWatcher } from './sagas';

const saga = createSagaMiddleware();
const store = createStore(reducer, compose(applyMiddleware(reduxLogger, saga)))
saga.run(sagaWatcher);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
,document.getElementById('root'));
