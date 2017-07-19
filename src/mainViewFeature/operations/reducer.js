import clone from 'clone';
import Utils from './utils';

const thing = (state = {manifest: {}, currentTree: {}, isFetching: true }, action) => {
  switch (action.type) {
    case 'GET_TREES_SUCCESS':


      const newManifest = action.payload.manifest;
      const newTree = Utils.createTreeFromNodeID('5959a20881426368639e2c2f', newManifest )

      return { manifest: newManifest, currentTree: newTree, isFetching: false}


    case 'SET_CURRENT_TREE':


      const { manifest, isFetching} = state;
console.log('in the reducer')
      const newerTree = Utils.createTreeFromNodeID(action.payload.id, manifest, action.payload.name)

      return { manifest, currentTree: newerTree, isFetching}


    case 'ADD_NODE':

      const newerManifest = clone(state.manifest);
      const newNode = action.payload;
      newerManifest[newNode._id] = action.payload;
      const newCurrentTree = clone(state.currentTree);
      newCurrentTree.children.push(newNode);

      return { ...state, manifest: newerManifest, currentTree: newCurrentTree}


    case 'NODE_DELETED':

      const evenNewManifest = clone(state.manifest);
      delete evenNewManifest[action.payload.id]
      const evenNewerCurrentTree = Utils.createTreeFromNodeID(state.currentTree._id, evenNewManifest)

      return {...state, manifest: evenNewManifest, currentTree: evenNewerCurrentTree}

    default:
      return state;
  }
}

export default thing;
