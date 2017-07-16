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
};
