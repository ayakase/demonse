const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let requestCount = 0;
function countRequests(req, res, next) {
  requestCount++;
  console.log(`Total Requests: ${requestCount}`);
  next();
}
app.use(countRequests);
app.get('/', (req, res) =>{
    res.send("hello this is server!");
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
