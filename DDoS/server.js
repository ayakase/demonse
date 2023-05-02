const express = require('express');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const username = req.query.username || '';
  res.render('index', { username });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
