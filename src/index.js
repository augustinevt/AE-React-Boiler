import ReactDOM from 'react-dom';
import React from 'react';
import component from './component';
import { AppContainer } from 'react-hot-loader';

import './styles/index.scss';

const app = document.createElement('div');
document.body.appendChild(app);

let demoComponent = component;


const render = (Component) => {

  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    app
  );
}

render(component);

if (module.hot) {
  module.hot.accept('./component', () => {
    render(component);
  });
}
