import ReactDOM from 'react-dom';
import React from 'react';
import component from './component';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import './styles/index.scss';
import reducer from './reducer';
import mySaga from './sagas'

import { createLogger } from 'redux-logger';

const logger = createLogger();

const app = document.createElement('div');
document.body.appendChild(app);
let demoComponent = component;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware, logger))
sagaMiddleware.run(mySaga)


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

render(component);

if (module.hot) {
  module.hot.accept('./component', () => {
    render(component);
  });
}
