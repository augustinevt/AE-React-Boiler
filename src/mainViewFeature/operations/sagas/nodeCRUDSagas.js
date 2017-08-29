import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import api from '../../../helpers/api';
import clone from 'clone';

function* setCurrentTree(action) {
  try {
    yield put({ type: 'SET_CURRENT_TREE', payload: action.payload})
  } catch (e) {
    console.log('error setting current tree', e)
  }
}

function* getTrees(action) {
  try {
    const manifest = yield call(api.sets, action.payload);
    yield put({ type: 'GET_TREES_SUCCESS', payload: {manifest} });

  } catch (e) {
    yield put({ type: 'GET_TREES_FAILURE', message: e.message})
  }
}

function* createNewNode(action) {

  try {
    const newID = yield call(api.addNode, action.payload);
    const newNode = clone(action.payload);
    newNode._id = newID.id;
    yield put({type: 'ADD_NODE', payload: newNode })
  } catch (e) {
    console.log('adding a node didn\'t work because ', e)
  }
}

function* deleteNode(action) {
  try {
  const id = yield call(api.deleteNode, action.payload.id)
  } catch (e) {
    console.log('deleting did not work', e, action)
  }

  yield put({type: 'NODE_DELETED', payload: {id: action.payload.id}})
}

function* updateNode(action) {
  try {
    console.log(action.payload)
    const id = yield call(api.updateNode, action.payload, action.payload._id)
  } catch (e) {
console.log('updating did not work', e)
  }
  yield put({type: 'UPDATE_NODE_SUCCESS', payload: action.payload });
}
///////////





function* createNewTree(action) {
  try {
    console.log(action.payload)
    const id = yield call(api.createTree, action.payload)
  } catch (e) {
console.log('creating new tree did not work', e)
  }
  yield put({type: 'CREATE_TREE_SUCCESS', payload: action.payload });
  yield getTrees({payload: action.payload});
}

function* treeCreatingSaga() {
  yield takeLatest("CREATE_TREE_REQUESTED", createNewTree)
}




//////



function* getTreeList(action) {
let treeList = [];
  try {
    treeList = yield call(api.getTreeList)
  } catch (e) {
console.log('creating new tree did not work', e)
  }

console.warn(';alsjf;laksdjf;lkasdjf;lksdjf;lkasdjf;lkasdj', treeList)
  yield put({type: 'GET_TREE_LIST_SUCCESS', payload: treeList[0].trees });
}

function* getTreeListSaga() {
  yield takeLatest("GET_TREE_LIST_REQUESTED", getTreeList)
}






///////

/// ===== ///

function* loadingSaga() {
  yield takeLatest("GET_TREES_REQUESTED", getTrees)
}

function* treeSettingSaga() {
  yield takeLatest("YOO", setCurrentTree)
}

function* createNodeSaga() {
  yield takeLatest("createNew", createNewNode)
}

function* deleteNodeSaga() {
  yield takeLatest("DELETE_NODE", deleteNode)
}

function* updateNodeSaga() {
  yield takeLatest("UPDATE_NODE_REQUEST", updateNode)
}

function* rootSaga() {
  yield all([
    loadingSaga(),
    treeSettingSaga(),
    createNodeSaga(),
    deleteNodeSaga(),
    updateNodeSaga(),

    treeCreatingSaga(),
    getTreeListSaga(),
  ])
}

export default rootSaga;
