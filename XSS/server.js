const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.set('view engine', 'ejs');
app.use(cors());

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
      let html = '';
      let form = `<form action="/submit" method="POST" onsubmit="setTimeout(function(){ location.reload(); }, 200);">
             <input type="text" name="message" id="message" style="width: 50rem; padding: 0.5rem; border: 1px solid black; border-radius: 0.5rem 0 0 0.5rem;">
             <button type="submit" style="padding: 0.5rem; border: none; background-color: #007bff; color: #fff; border-radius: 0 0.5rem 0.5rem 0;">Send</button>
           </form>`;
      for (let i = 0; i < results.length; i++) {
        const message = results[i];
        html += '<div id="' + message.id + '" class="message">' + message.message + '</div>';
      }
      
      html = '<div id="chat-container" style="height: 40rem; display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; overflow: auto;">' + html + form + '<style> .message { padding: 1rem; margin: 0.5rem; border: 1px solid #ccc; border-radius: 0.5rem; } </style></div> <script> var container = document.getElementById("chat-container"); container.scrollTop = container.scrollHeight; </script>';
      
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
      console.log('chat');
    }
  });
});
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
