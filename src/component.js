import React from 'react';
import api from './helpers/api';
import Card from './Card';
import Path from './Path';
import NewNodeForm from './NewNode';

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
    this.createNewNode = this.createNewNode.bind(this)
  }

  componentDidMount() {

    this.props.dispatch({type: 'GET_TREES_REQUESTED', payload: []})

  }

  dispatchNewSaga(data) {
console.log(data)
    this.props.dispatch({type: 'YOO', payload: {
      id: data.id,
      name: data.name,
      manifest: this.props.manifest
    }})
  }

  createNewNode(data) {
    const payload = {
      name: data.name,
      path: this.props.root.path + `/${this.props.root.name}`,
      version: this.props.root.version,
      tree: this.props.root.tree,
    }
    this.props.dispatch({
      type: 'createNew',
      payload,
    })
  }



  display(sets) {
    const children = this.props.root.children.map((child, i) => {
      return <Card node={child} handyEvent={ this.dispatchNewSaga }/>
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
        <NewNodeForm otherHandyEvent={this.createNewNode}/>
      </div>
    )
  }
}


const connectedDemoReact = connect(mapStateToProps)(DemoReact);
export default connectedDemoReact;
