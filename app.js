const express = require('express');
const app = express();

app.get('/time', (req, res) => {
    res.send("time is 13");
})

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log("connection succeed");
});


