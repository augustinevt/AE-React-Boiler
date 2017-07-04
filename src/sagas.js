import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import api from './helpers/api';
import clone from 'clone';


function* setCurrentTree(action) {
  try {

  } catch (e) {

  }
}






function* getTrees(action) {

  try {
    const defaultNode = 'power'
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


    yield put({ type: 'SET_CURRENT_TREE', payload: newPower });
    yield put({ type: 'GET_TREES_SUCCESS', payload: manifest });

  } catch (e) {
    yield put({ type: 'GET_TREES_FAILURE', message: e.message})
  }
}

function* loadingSaga() {
  yield takeLatest("GET_TREES_REQUESTED", getTrees)
}

function* treeSettingSaga() {
  yield takeLatest("SET_CURRENT_TREE", setCurrentTree)
}

function* rootSaga() {
  yield all([
    loadingSaga(),
    treeSettingSaga()
  ])
}

export default rootSaga;
