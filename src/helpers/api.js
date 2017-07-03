export default {
  sets: () => {
    return fetch('http://localhost:8000/tree/prime').then((res => {
      console.log(res)
      return res.json();
    }));
  },
};
