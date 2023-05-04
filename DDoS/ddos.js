const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const axios = require('axios');

async function makeRequests() {
  for (let i = 0; i < 1000; i++) {
    try {
      await axios.get('http://localhost:3000/');
      console.log(`request`);
    } catch (error) {
      console.error(error);
    }
  }
  await makeRequests();
}

makeRequests().then(() => {
  app.listen(3001, () => {
    console.log('Server started on port 3001');
  });
});
