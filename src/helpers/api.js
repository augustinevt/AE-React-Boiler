export default {
  sets: () => {
    return fetch('http://localhost:8000/tree/prime').then((res => {
      console.log(res)
      return res.json();
    }));
  },
  addNode: (newObject) => {
    return fetch('http://localhost:8000/createNode', {
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
    return fetch(`http://localhost:8000/${id}`, {
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
};
