const apiDomain = 'http://api.tree.augustinevt.com'

export default {
  sets: () => {
    return fetch(`${apiDomain}/tree/prime`).then((res => {
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
console.log(updatedObject, id)
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
};
