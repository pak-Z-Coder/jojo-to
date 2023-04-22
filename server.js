const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors=require("cors");
const path=require("path");
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.send('Konichiwa!');
})
app.use('/search',require('./routes/search'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
