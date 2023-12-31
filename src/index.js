import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './routes/AppRouter'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './Redux/store'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  rootElement
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
