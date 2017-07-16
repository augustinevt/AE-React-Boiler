import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import api from './helpers/api';
import clone from 'clone';


function* setCurrentTree(action) {
  try {
console.log(action.log)
    const {id, name, manifest} = action.payload;

    let newRoot;

    if ( name ) {
      for (const key in manifest) {
        const node = manifest[key];
        newRoot = node.name === name ? node : newRoot;
      }
    } else if ( id ) {
       newRoot = clone(manifest[id]);
    } else {
      console.log('Something is wrong with the tree building mech in saga')
    };

    const children = [];

    for (const key in manifest) {
      const node = manifest[key];
      const pathArray = node.path ? node.path.split(',') : '';
      const parent = pathArray[pathArray.length - 2];
      if (parent === newRoot.name) {
        children.push(node);
      }
    }

    newRoot.children = children;

console.log(newRoot)

    yield put({ type: 'SET_CURRENT_TREE', payload: {newRoot} })
  } catch (e) {
    console.log('foo')
  }
}


function* getTrees(action) {

  try {
    const defaultNode = '5959a20881426368639e2c2f'
    const manifest = yield call(api.sets);
    const newTree = {};
    const newPower = clone(manifest[defaultNode]);
    const children = [];


    for (const key in manifest) {
      const node = manifest[key];
      const pathArray = node.path ? node.path.split(',') : '';
      const parent = pathArray[pathArray.length - 2];
      if (parent === newPower.name) {
        children.push(node);
      }
    }

    newPower.children = children;
    newTree.root = newPower;

    // yield put({ type: 'SET_CURRENT_TREE', payload: newPower });
    yield put({ type: 'GET_TREES_SUCCESS', payload: {manifest, newPower} });

  } catch (e) {
    yield put({ type: 'GET_TREES_FAILURE', message: e.message})
  }
}

function* createNewNode(action) {

  try {
    const newID = yield call(api.addNode, action.payload);
    const newNode = clone(action.payload);
    newNode.id = newID.id;
    yield put({type: 'ADD_NODE', payload: newNode })
  } catch (e) {
    console.log('adding a node didn\'t work because ', e)
  }
}

function* loadingSaga() {
  yield takeLatest("GET_TREES_REQUESTED", getTrees)
}

function* treeSettingSaga() {
  yield takeLatest("YOO", setCurrentTree)
}

function* createNodeSaga() {
  yield takeLatest("createNew", createNewNode)
}

function* rootSaga() {
  yield all([
    loadingSaga(),
    treeSettingSaga(),
    createNodeSaga(),
  ])
}

export default rootSaga;
