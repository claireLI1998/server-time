const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("homepage succeed");
})

app.listen(3000, () => {
    console.log("connection succeed");
});

