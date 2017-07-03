import React from 'react';
import api from './helpers/api';

import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    trees: state.trees,
    isFetching: state.isFetching,
  }
}

class DemoReact extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sets: [],

    }
  }

  componentDidMount() {

    this.props.dispatch({type: 'GET_TREES_REQUESTED', payload: []})

  }

// will probably
  display(sets) {
    if ( this.props.isFetching ) {
      return <h1> loading </h1>
    }
    return <h1> foo </h1>
console.log(sets)
  }

  render() {

    const display = this.display(this.props.trees)

// console.log('hello', this.props, this)

    return(
      <div>
        { display }
      </div>
    )
  }
}


const connectedDemoReact = connect(mapStateToProps)(DemoReact);
export default connectedDemoReact;
