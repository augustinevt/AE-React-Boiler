import clone from 'clone';

const thing = (state = {manifest: {}, currentTree: {}, isFetching: true }, action) => {
  switch (action.type) {
    case 'GET_TREES_SUCCESS':
      const newManifest = action.payload.manifest;
      const newTree = action.payload.newPower;
      return { manifest: newManifest, currentTree: newTree, isFetching: false}
    case 'SET_CURRENT_TREE':
      const { manifest, isFetching} = state;
      return { manifest, currentTree: action.payload.newRoot, isFetching}
    case 'ADD_NODE':
      const newerManifest = clone(state.manifest);
      const newNode = action.payload;
      const newCurrentTree = clone(state.currentTree);
      newCurrentTree.children.push(newNode);
      newerManifest[newNode.id] = action.payload;
      return { ...state, manifest: newerManifest, currentTree: newCurrentTree}
    default:
      return state;
  }
}

export default thing;
