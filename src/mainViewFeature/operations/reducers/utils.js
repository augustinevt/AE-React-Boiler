import clone from 'clone';

const createTreeFromNodeID = (id, manifest, name=false) => {

  let newRoot;

  if ( name ) {
    for (const key in manifest) {
      const node = manifest[key];
      newRoot = node.name === name ? node : newRoot;
    }
  } else if ( id ) {
     newRoot = clone(manifest[id]);
  } else {
    // HACK: this is kind of stupid
    for ( var node in manifest) {
      if ( manifest[node].path === "" ) {
        newRoot = manifest[node];
      }
    }
  };

  const children = [];

  for (const key in manifest) {
    const node = manifest[key];
    const pathArray = node.path ? node.path.split(',') : '';
    const parent = pathArray[pathArray.length - 2];
    if (parent === newRoot.name) {
      children.push(node);
    }
  }

  newRoot.children = children;
  return newRoot;
}

export default {
  createTreeFromNodeID,
}
