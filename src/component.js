import React from 'react';
import api from './helpers/api';

class DemoReact extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sets: [],
    }
  }

  componentDidMount() {
    api.sets()
      .then((res) => { return res.json() })
      .then((json) => { this.setState({sets: json}) })
  }

// will probably
  displaySets(sets) {

    return sets.map((set, i) => {
      const setItems = set.items.map((item, j) => {
        return <h3 key={`${set.name}-item-${j}`}> {item} </h3>
      });

      return(
        <div key={`${set.name}-${i}`} >
          <h1> {set.name} </h1>
          { setItems }
        </div>
      )
    })
  }

  render() {
    const sets = this.displaySets(this.state.sets);

    return(
      <div>
        { sets }
      </div>
    )
  }
}

export default DemoReact;
