export default {
  sets: () => {
    return fetch('http://ec2-34-229-173-148.compute-1.amazonaws.com/tree/prime').then((res => {
      console.log(res)
      return res.json();
    }));
  },
  addNode: (newObject) => {
    return fetch('http://ec2-34-229-173-148.compute-1.amazonaws.com/createNode', {
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
    return fetch(`http://ec2-34-229-173-148.compute-1.amazonaws.com
/${id}`, {
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
    return fetch(`http://ec2-34-229-173-148.compute-1.amazonaws.com
/${id}`, {
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
