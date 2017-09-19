import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { apiMiddleware } from 'redux-api-middleware';

import reducer from './reducer'

import App from './container'

// このへん魔法みたいなもんなので、そういうものと思っておく
const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer)

// Provider で囲むと以後よろしくやってくれる
// よろしくというのは、 reducer で設定される state を props に変換してコンポーネントを呼び出し、適切なタイミングでレンダリングしてくれるという意味
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('#container')
);



