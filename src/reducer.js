const thing = (state = [], action) => {
  console.log(action)
  switch (action.type) {
    case 'GET_TREES_SUCCESS':
      return { trees: action.payload }
    default:
      return ['not empty']
  }
}

export default thing;
