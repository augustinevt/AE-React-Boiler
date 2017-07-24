import ReactDOM from 'react-dom';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { all } from 'redux-saga/effects'

import './styles/index.scss';

import { mainViewSagas, mainViewReducer } from './mainViewFeature';

import App from './component';

const logger = createLogger();

const app = document.createElement('div');
document.body.appendChild(app);

// const reducers = combineReducers({
//   reducer,
// })

function* rootSaga() {
  yield all([
    mainViewSagas()
  ])
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(mainViewReducer, applyMiddleware(sagaMiddleware, logger))
sagaMiddleware.run(rootSaga)


const render = (Component) => {

  ReactDOM.render(
    <Provider store={store} >
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    app
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./component', () => {
    render(App);
  });
}
