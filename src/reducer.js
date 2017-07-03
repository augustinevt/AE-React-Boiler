const thing = (state = {trees: [], isFetching: true }, action) => {
  console.log(action)
  switch (action.type) {
    case 'GET_TREES_SUCCESS':
      return { trees: action.payload, isFetching: false}
    default:
      return state;
  }
}

export default thing;
