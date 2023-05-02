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
    const data = {
        title: 'My EJS View',
        message: 'Hello, EJS!'
    };
    ejs.renderFile('./views/index.ejs', data, (err, html) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error rendering view');
        } else {
            res.send(html);
        }
    });
});

app.post('/submit', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    con.query("SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'", [username, password], function(error, results, fields) {
      if (error) {
        console.error(error);
        res.render('failed');
        return;
      }
  
      if (results.length === 0) {
        res.render('failed');
        return;
      }
      res.render('success');
    });
  });
  
app.listen(3000, () => {
    console.log('Server started on port 3000');
});

//  ' OR 1=1--'
// 'SELECT * FROM users WHERE username = ? AND password = ?'