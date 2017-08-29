const apiDomain = 'http://localhost:8000';

export default {
  sets: (treeName) => {
    return fetch(`${apiDomain}/tree/${treeName}`).then((res => {
      console.log(res)
      return res.json();
    }));
  },
  addNode: (newObject) => {
    return fetch(`${apiDomain}/createNode`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      method: 'POST',
      body: JSON.stringify(newObject)

    }).then((res => {
      console.log(res)
      return res.json();
    }));
  },
  deleteNode: (id) => {
    return fetch(`${apiDomain}/${id}`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      method: 'DELETE',
    }).then((res => {
      console.log(res)
      return res.json();
    }));
  },
  updateNode: (updatedObject, id) => {
    return fetch(`${apiDomain}/${id}`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      method: 'PUT',
      body: JSON.stringify(updatedObject)
    }).then((res => {
      console.log(res)
      return res.json();
    }));
  },


  createTree: (treeName) => {
    return fetch(`${apiDomain}/tree`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      method: 'POST',
      body: JSON.stringify({name: treeName})

    }).then((res => {
      console.log(res)
      return res.json();
    }));
  },

  getTreeList: () => {
    return fetch(`${apiDomain}/treeSettings/august_von_trapp`).then((res => {
      console.log(res)
      return res.json();
    }));
  },

};
