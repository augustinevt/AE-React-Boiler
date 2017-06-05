//
/// temp set models
//

const setOne = {
  name: 'End Of Day',
  items: ['Check Calendar', 'Clean a Little', 'Set Out Materials'],
};

const setTwo = {
  name: 'Beginning of Day',
  items: ['Check Calendar', 'Clean a Little', 'Set Out Materials'],
};

const setThree = {
  name: 'Middle of Day',
  items: ['Check Calendar', 'Clean a Little', 'Set Out Materials'],
};

//
/// below is the mock server
//

const express = require('express');
const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', function (req, res) {
  res.json([setOne, setTwo, setThree]);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
