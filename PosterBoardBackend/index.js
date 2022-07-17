let storage = require('./storage.json');
const express = require('express');
const fs = require('fs');
const cors = require('cors')
const app = express();
const PORT = 8080;
app.use(
    cors({
        origin: "*"
    })
)

app.use(express.json())

app.listen(
    PORT,
    () => console.log(`now live on http://localhost:${PORT}`)
)


app.get('/data', (req, res) => {
    res.status(200).send(storage)
})

app.post('/newPost', (req, res) => {
    storage[req.body.info[0]] = req.body.info[1]

    fs.writeFile('./storage.json', JSON.stringify(storage), err => {
        if (err) {
            res.status(500).send()
            return
          }
    })
    res.status(200).send({'ok': 12})
})

app.delete('/midnight', (req, res) => {
    fs.writeFile('./storage.json', JSON.stringify({}), err => {
        if (err) {
            res.status(500).send()
            return
          }
    })
    res.status(200).send()
    storage = {}
})