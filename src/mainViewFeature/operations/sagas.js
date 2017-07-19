import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import api from '../../helpers/api';
import clone from 'clone';


function* setCurrentTree(action) {
  try {
console.log(action)
    yield put({ type: 'SET_CURRENT_TREE', payload: action.payload})
  } catch (e) {
    console.log('foo')
  }
}


function* getTrees(action) {

  try {

    const manifest = yield call(api.sets);
    yield put({ type: 'GET_TREES_SUCCESS', payload: {manifest} });

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
