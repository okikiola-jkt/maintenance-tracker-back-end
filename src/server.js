const express = require("express");

const app = express();
const port = 3000;

const posts = [
    {
        username: 'Kyle',
        password: 'Post 1'
    },

    {
        username: 'David',
        password: 'David2'
    }
]

app.get('/posts', (req, res) => {
    res.json(posts)
})


app.listen(port, () => console.log(`app listening on port ${port}`));