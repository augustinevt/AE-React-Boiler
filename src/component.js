import React from 'react';

import { mainViewContainers } from './mainViewFeature';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        < mainViewContainers.MainView />
      </div>
    )
  }
}

export default App;
