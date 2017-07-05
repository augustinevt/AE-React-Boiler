import React from 'react';
import api from './helpers/api';
import Card from './Card';
import Path from './Path';

import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    root: state.currentTree,
    manifest: state.manifest,
    isFetching: state.isFetching,
  }
}

class DemoReact extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sets: [],
    }

    this.dispatchNewSaga = this.dispatchNewSaga.bind(this)
  }

  componentDidMount() {

    this.props.dispatch({type: 'GET_TREES_REQUESTED', payload: []})

  }

  dispatchNewSaga(data) {
console.log(data)
    this.props.dispatch({type: 'YOO', payload: {
      name: data.name,
      manifest: this.props.manifest
    }})
  }

// will probably
  display(sets) {

    const children = this.props.root.children.map((child, i) => {
      return <Card name={child.name} handyEvent={ this.dispatchNewSaga }/>
    })

    return (
      <div>
        <div className="tree_path">
          <Path handyEvent={ this.dispatchNewSaga } path={ this.props.root.path } />
        </div>
        <div className="tree__node-name">
          <h1> {this.props.root.name} </h1>
        </div>
          <div className="tree__children">
            { children}
          </div>
      </div>
    )
  }



  render() {
    let jsx;
      if ( this.props.isFetching ) {
        jsx =  <h1> loading </h1>
      } else {
        jsx = this.display(this.props.trees)
      }


    return(
      <div className="tree">
        {jsx}
      </div>
    )
  }
}


const connectedDemoReact = connect(mapStateToProps)(DemoReact);
export default connectedDemoReact;
