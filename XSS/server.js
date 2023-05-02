const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');


const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const mysql = require('mysql2');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'demonse'
});
app.get('/', (req, res) => {
  con.query('SELECT * FROM chat ORDER BY id ASC', (err, results) => {
    if (err) {
      console.error(err);
    } else {
      let html = `<form action="/submit" method="POST" onsubmit="setTimeout(function(){ location.reload(); }, 500);"><input type="text" name="message" id="message"><input type="submit" value="Submit"></form>`
      for (let i = 0; i < results.length; i++) {
        const message = results[i];
        html += '<div id="' + message.id + '">' + message.message + '</div>';
      }
      res.send(html);
    }
  });
})

app.post('/submit', (req, res) => {
  const message = req.body.message;
  con.query('INSERT INTO chat (message) VALUES (?)', [message], (err, results) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Gotcha!');
    }
  });
});
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
