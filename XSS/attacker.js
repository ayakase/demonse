const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, 
  };
  app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  console.log('Server is running');
  res.send('Server is running');
});
app.post('/', (req, res) => {
  console.log('something:', req.body);
  res.send('Received your cookie!');
});
app.listen(4000, () => {
  console.log('Server started on port 4000');
});
