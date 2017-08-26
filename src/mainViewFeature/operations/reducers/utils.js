import clone from 'clone';

const createTreeFromNodeID = (id, manifest, name=false) => {

  let newRoot;

  if ( name ) {
    for (const key in manifest) {
      const node = manifest[key];
      newRoot = node.name === name ? node : newRoot;
    }
  } else if ( id ) {
console.log('id block was run', manifest)
     newRoot = clone(manifest[id]);
  } else {
    console.log('Something is wrong with the tree building mech in saga')
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
