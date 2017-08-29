import React from 'react';
import api from '../../helpers/api';
import Card from '../components/Card';
import Path from '../components/Path';
import NewNodeForm from '../components/NewNode';
import NodeName from '../components/NodeName';
import merge from 'deepmerge';
import Quill from 'quill';
import ReactQuill from 'react-quill';
import theme from 'react-quill/dist/quill.snow.css'


import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    root: state.currentTree.currentTree,
    manifest: state.currentTree.manifest,
    isFetching: state.currentTree.isFetching,

    treeName: state.treeSettings.treeName,
    treeVersion: state.treeSettings.treeVersion,
    treeList: state.treeSettings.treeList,
  }
}

class DemoReact extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      description: this.props.root.description
    }

    this.dispatchNewSaga = this.dispatchNewSaga.bind(this);
    this.createNewNode = this.createNewNode.bind(this);
    this.deleteChildNode = this.deleteChildNode.bind(this);
    this.updateNode = this.updateNode.bind(this);
    this.saveDescription = this.saveDescription.bind(this);

    this.createNewTree = this.createNewTree.bind(this);
  }

  componentDidMount() {

    this.props.dispatch({type: 'GET_TREES_REQUESTED', payload: this.props.treeName})
    this.props.dispatch({type: 'GET_TREE_LIST_REQUESTED', payload: this.props.treeName})

  }


  updateDescription(e) {
    this.setState({description: e})
  }

  saveDescription() {
    const html = this.editor.getEditorContents();
    this.updateNode({description: html})
  }

  dispatchNewSaga(data) {
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
    this.props.dispatch({type: 'DELETE_NODE', payload: {id: data.id}} )
  }



  /// new tree stuff ///

  createNewTree() {
    console.log(this.newTreeInput.value)

    this.props.dispatch({type: 'CREATE_TREE_REQUESTED', payload: this.newTreeInput.value})


  }

  displayTreeList() {
    return this.props.treeList.map( tree => {
      return <h3> {tree} </h3>
    })
  }

  display(sets) {
    const children = this.props.root.children.map((child, i) => {
      return <Card node={child} deleteEvent={this.deleteChildNode} handyEvent={ this.dispatchNewSaga }/>
    })

    const trees = this.displayTreeList();

    return (
      <div>

        <div>
          <input ref={ (el) => {this.newTreeInput = el}} />
          <button onClick={this.createNewTree}> Create New Tree </button>
        </div>

        {trees}


        <div className="tree_path">
          <Path handyEvent={ this.dispatchNewSaga } path={ this.props.root.path } />
        </div>
        <div id="foo" className="tree__node-name">
          <NodeName name={this.props.root.name} updateNode={this.updateNode} />
        </div>
        <div className="tree__children">
          { children}
        </div>
        <ReactQuill ref={ editor => {this.editor = editor}} value={this.props.root.description} />
        <button onClick={this.saveDescription}> save </button>
      </div>
    )
  }

  render() {

    let jsx;
      if ( this.props.isFetching ) {
        jsx =  <h1> loading </h1>
      } else if ( !this.props.root ) {
        jsx = "There are no nodes"
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
