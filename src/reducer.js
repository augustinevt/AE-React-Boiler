const thing = (state = {manifest: {}, currentTree: {}, isFetching: true }, action) => {
  console.log(action)
  switch (action.type) {
    case 'GET_TREES_SUCCESS':
      const { currentTree } = state;
      return { manifest: action.payload, currentTree, isFetching: false}
    case 'SET_CURRENT_TREE':
      const { manifest, isFetching} = state;
      return { manifest, currentTree: action.payload, isFetching}
    default:
      return state;
  }
}

export default thing;
