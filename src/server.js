const express = require("express");
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());


app.use(routes);

app.get('/posts', (req, res) => {
    res.json(posts);
})


app.listen(port, () => console.log(`app listening on port ${port}`));