import clone from 'clone';

const createTreeFromNodeID = (id, manifest) => {

  let newRoot;

    newRoot = clone(manifest[id]);

console.log(id, newRoot)

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
