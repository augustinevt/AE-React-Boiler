export default {
  sets: () => {
    return fetch('http://localhost:3000').then((res => {
      console.log(res)
      return res.json();
    }));
  },
};
