import clone from 'clone';
import Utils from './utils';

const thing = (state = { treeName: 'prime', treeVersion: 1, treeList: [] }, action) => {
  switch (action.type) {
    case 'CREATE_TREE_SUCCESS':

      return {...state, treeName: action.payload};

    case 'GET_TREE_LIST_SUCCESS':

      return {...state, treeList: action.payload};

    default:
      return state;
  }
}

export default thing;
