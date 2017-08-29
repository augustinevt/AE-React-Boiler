import { combineReducers } from 'redux';

import nodeCRUDReducer from './nodeCRUDReducer';
import treeCRUDReducer from './treeCRUDReducer';

const reducers = combineReducers({
  currentTree: nodeCRUDReducer,
  treeSettings: treeCRUDReducer
})

export default reducers;
