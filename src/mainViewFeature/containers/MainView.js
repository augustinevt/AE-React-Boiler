import React from 'react';
import api from '../../helpers/api';
import Card from '../components/Card';
import Path from '../components/Path';
import NewNodeForm from '../components/NewNode';
import NodeName from '../components/NodeName';
import merge from 'deepmerge';

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
    this.deleteChildNode = this.deleteChildNode.bind(this)
    this.updateNode = this.updateNode.bind(this)
  }

  componentDidMount() {

    this.props.dispatch({type: 'GET_TREES_REQUESTED', payload: []})

  }

  dispatchNewSaga(data) {
console.log(data)
    this.props.dispatch({type: 'YOO', payload: {
      id: data.id,
      name: data.name,
    }})
  }

  updateNode(data) {
    const updatedNodeObject = merge(this.props.root, data)
    this.props.dispatch({type: 'UPDATE_NODE_REQUEST', payload: updatedNodeObject})
  }

  createNewNode(data) {
    const path = this.props.root.path === "" ? "," : this.props.root.path;
    const payload = {
      name: data.name,
      path: path + `${this.props.root.name},`,
      version: this.props.root.version,
      tree: this.props.root.tree,
    }
    this.props.dispatch({
      type: 'createNew',
      payload,
    })
  }

  deleteChildNode(data) {
console.log(data)
    this.props.dispatch({type: 'DELETE_NODE', payload: {id: data.id}} )
  }


  display(sets) {
    const children = this.props.root.children.map((child, i) => {
      return <Card node={child} deleteEvent={this.deleteChildNode} handyEvent={ this.dispatchNewSaga }/>
    })

    return (
      <div>
        <div className="tree_path">
          <Path handyEvent={ this.dispatchNewSaga } path={ this.props.root.path } />
        </div>
        <div className="tree__node-name">
          <NodeName name={this.props.root.name} updateNode={this.updateNode} />
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
