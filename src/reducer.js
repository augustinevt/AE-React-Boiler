const thing = (state = {manifest: {}, currentTree: {}, isFetching: true }, action) => {
  console.log(action)
  switch (action.type) {
    case 'GET_TREES_SUCCESS':

      const newManifest = action.payload.manifest;
      const newTree = action.payload.newPower;

      return { manifest: newManifest, currentTree: newTree, isFetching: false}

    case 'SET_CURRENT_TREE':

      const { manifest, isFetching} = state;
      return { manifest, currentTree: action.payload.newRoot, isFetching}
    default:
      return state;
  }
}

export default thing;
