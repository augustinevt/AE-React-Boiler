import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import api from './helpers/api';

function* getTrees(action) {
  try {
    const trees = yield call(api.sets)
    yield put({ type: 'GET_TREES_SUCCESS', payload: trees.children });
  } catch (e) {
    yield put({ type: 'GET_TREES_FAILURE', message: e.message})
  }
}

function* mySaga() {
  yield takeLatest("GET_TREES_REQUESTED", getTrees)
}

export default mySaga;
