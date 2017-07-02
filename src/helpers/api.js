export default {
  sets: () => {
    return fetch('http://localhost:8000').then((res => {
      console.log(res)
      return res.json();
    }));
  },
};
